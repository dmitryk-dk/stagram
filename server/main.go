package main

import (
	"io/ioutil"
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"golang.org/x/crypto/bcrypt"
	"github.com/dmitryk-dk/stagram/server/data"
	"github.com/satori/go.uuid"
)

type user struct {
	UserName string
	Password []byte
	First    string
	Last     string
}

type Credentials struct {
	UserName string `json:"login"`
	Password string `json:"password"`
}

var dbUsers = map[string]user{}
var dbSessions = map[string]string{}

type Posts struct {
	Posts    interface{} `json:"posts"`
}

type Comments struct {
	Comments interface{} `json:"comments"`
}

type Endpoints struct {
	Login    string `json:"login"`
	Posts 	 string `json:"posts"`
	Comments string `json:"comments"`
	Signup 	 string `json:"signup"`
}

type Authorization struct {
	IsAuthed bool `json:"isAuthed"`
}

type InitData struct {
	Endpoints `json:"endpoints"`
	Authorization
}

var tmpl *template.Template

func init() {
	tmpl = template.Must(template.ParseGlob("../public/index.html"))
	bp, _ := bcrypt.GenerateFromPassword([]byte("password"), bcrypt.MinCost)
	dbUsers["test@test.com"] = user{"test@test.com", bp, "James", "Bond"}
}

func main() {
	// listening port
	const port = ":3000"
	fs := http.FileServer(http.Dir("../public"))
	http.Handle("/public/", http.StripPrefix("/public/", fs))
	//start server
	http.Handle("/", http.HandlerFunc(serveTemplate))
	http.Handle("/login", http.HandlerFunc(login))
	http.Handle("/posts",http.HandlerFunc(posts))
	http.Handle("/comments", http.HandlerFunc(comments))
	http.Handle("/favicon.ico", http.NotFoundHandler())
	//stop server
	prepareShutdown()
	http.ListenAndServe(port, nil)
}

func prepareShutdown() {
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGKILL, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		log.Printf("Got signal %d", <-sig)
		os.Exit(0)
	}()
}

func serveTemplate(w http.ResponseWriter, req *http.Request) {
	isAuthed := alreadyLoggedIn(req)
	// responsData := Data{
	// 	data.Posts,
	// 	data.PostsComments,
	// 	isAuthed,
	// }
	endpoints := InitData{
		Endpoints {
			Login: "/login",
			Signup: "/signup",
			Posts: "/posts",
			Comments: "/comments",
		},
		Authorization{
			IsAuthed: isAuthed,
		},
	}
	jsonData, _ := json.Marshal(endpoints)
	tmpl.ExecuteTemplate(w, "index.html",string(jsonData))
}

func login(w http.ResponseWriter, req *http.Request) {
	var credentials Credentials
	if alreadyLoggedIn(req) {
		http.Redirect(w, req, "/posts", http.StatusSeeOther)
		return
	}

	if req.Method == http.MethodPost {
		body, _ := ioutil.ReadAll(req.Body)
		err := json.Unmarshal(body, &credentials)
		defer req.Body.Close()
		if err != nil {
			http.Error(w, "Error json format", http.StatusInternalServerError)
			return
		}
		
		user, ok := dbUsers[credentials.UserName]
		if !ok {
			http.Error(w, "Username and/or password do not match", http.StatusForbidden)
			return
		}

		err = bcrypt.CompareHashAndPassword(user.Password, []byte(credentials.Password))
		if err != nil {
			http.Error(w, "Username and/or password do not match", http.StatusForbidden)
			return
		}

		sessionId := uuid.NewV4()
		cookie := &http.Cookie{
			Name: "session",
			Value: sessionId.String(),
		}
		http.SetCookie(w, cookie)
		dbSessions[cookie.Value] = credentials.UserName
		http.Redirect(w, req, "/posts", http.StatusAccepted)
		return
	}
}

func alreadyLoggedIn(req *http.Request) bool {
	c, err := req.Cookie("session")
	if err != nil {
		return false
	}
	
	un := dbSessions[c.Value]
	_, ok := dbUsers[un]
	return ok
}

func posts(w http.ResponseWriter, req *http.Request) {
	if !alreadyLoggedIn(req) {
		http.Redirect(w, req, "/", http.StatusForbidden)
		return
	}

	if req.Method == http.MethodGet {
		posts := Posts{
			Posts: data.Posts,
		}
		jsonData, _ := json.Marshal(posts)
		w.Write(jsonData) 
	}
}

func comments(w http.ResponseWriter, req *http.Request) {
	if !alreadyLoggedIn(req) {
		http.Redirect(w, req, "/", http.StatusForbidden)
		return
	}

	if req.Method == http.MethodGet {
		posts := Comments{
			Comments: data.PostsComments,
		}
		jsonData, _ := json.Marshal(posts)
		w.Write(jsonData) 
	}
}

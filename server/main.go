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
	UserName string `json:"login"`
	Password string `json:"password"`
	Nickname string `json:"nickName"`
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
	Logout 	 string `json:"logout"`
}

type Authorization struct {
	IsAuthed   bool `json:"isAuthed"`
}

type InitData struct {
	Endpoints `json:"endpoints"`
	Authorization
}

var tmpl *template.Template

func init() {
	tmpl = template.Must(template.ParseGlob("../public/index.html"))
	bp, _ := bcrypt.GenerateFromPassword([]byte("password"), bcrypt.MinCost)
	dbUsers["test@test.com"] = user{"test@test.com", string(bp), "James"}
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
	http.Handle("/signup", http.HandlerFunc(signup))
	http.Handle("/logout", http.HandlerFunc(logout))
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

	endpoints := InitData{
		Endpoints {
			Login: "/login",
			Signup: "/signup",
			Posts: "/posts",
			Comments: "/comments",
			Logout: "/logout",
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

		err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(credentials.Password))
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

// func isAuthed(req *http.Request) bool {

// }


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
	// if !alreadyLoggedIn(req) {
	// 	http.Redirect(w, req, "/", http.StatusForbidden)
	// 	return
	// }

	if req.Method == http.MethodGet {
		posts := Posts{
			Posts: data.Posts,
		}
		jsonData, _ := json.Marshal(posts)
		w.Write(jsonData) 
	}
}

func comments(w http.ResponseWriter, req *http.Request) {
	// if !alreadyLoggedIn(req) {
	// 	http.Redirect(w, req, "/", http.StatusForbidden)
	// 	return
	// }

	if req.Method == http.MethodGet {
		posts := Comments{
			Comments: data.PostsComments,
		}
		jsonData, _ := json.Marshal(posts)
		w.Write(jsonData) 
	}
}

func signup(w http.ResponseWriter, req *http.Request) {
	var user user
	if alreadyLoggedIn(req) {
		http.Redirect(w, req, "/posts", http.StatusSeeOther)
		return
	}

	if req.Method == http.MethodPost {
		body, _ := ioutil.ReadAll(req.Body)
		err := json.Unmarshal(body, &user)
		defer req.Body.Close()
		if err != nil {
			http.Error(w, "Error json format", http.StatusInternalServerError)
			return
		}

		if _, ok := dbUsers[user.UserName]; ok {
			http.Error(w, "Username already taken", http.StatusForbidden)
			return
		}

		sID := uuid.NewV4()
		cookie := &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
		http.SetCookie(w, cookie)
		dbSessions[cookie.Value] = user.UserName
		dbUsers[user.UserName] = user
		http.Redirect(w, req, "/posts", http.StatusAccepted)
	}
}

func logout(w http.ResponseWriter, req *http.Request) {
	if !alreadyLoggedIn(req) {
		http.Redirect(w, req, "/login", http.StatusForbidden)
		return
	}

	cookie, _ := req.Cookie("session")
	delete(dbSessions, cookie.Value)
	// remove the cookie
	cookie = &http.Cookie{
		Name:   "session",
		Value:  "",
		MaxAge: -1,
	}
	http.SetCookie(w, cookie)

	http.Redirect(w, req, "/login", http.StatusOK)
}

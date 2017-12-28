package handlers

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

func PrepareShutdown() {
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGKILL, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		log.Printf("Got signal %d", <-sig)
		os.Exit(0)
	}()
}

func ServeTemplate(w http.ResponseWriter, req *http.Request) {
	var tmpl *template.Template
	tmpl = template.Must(template.ParseGlob("../public/index.html"))
	endpoints := data.InitData{
		data.Endpoints {
			Login: "/login",
			Signup: "/signup",
			Posts: "/posts",
			Comments: "/comments",
			Logout: "/logout",
		},
		data.Authorization{
			IsAuthed: AlreadyLoggedIn(req),
		},
	}
	jsonData, _ := json.Marshal(endpoints)
	tmpl.ExecuteTemplate(w, "index.html",string(jsonData))
}

func Login(w http.ResponseWriter, req *http.Request) {
	var credentials data.Credentials
	if AlreadyLoggedIn(req) {
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
		
		user, ok := data.DbUsers[credentials.UserName]
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
		data.DbSessions[cookie.Value] = credentials.UserName
		http.Redirect(w, req, "/posts", http.StatusAccepted)
		return
	}
}

func AlreadyLoggedIn(req *http.Request) bool {
	c, err := req.Cookie("session")
	if err != nil {
		return false
	}
	
	un := data.DbSessions[c.Value]
	_, ok := data.DbUsers[un]
	return ok
}

func Posts(w http.ResponseWriter, req *http.Request) {
	if req.Method == http.MethodGet {
		posts := data.PostsData{
			Posts: data.Posts,
		}
		jsonData, _ := json.Marshal(posts)
		w.Write(jsonData) 
	}
}

func Comments(w http.ResponseWriter, req *http.Request) {
	if req.Method == http.MethodGet {
		posts := data.CommentsData{
			Comments: data.PostsComments,
		}
		jsonData, _ := json.Marshal(posts)
		w.Write(jsonData) 
	}
}

func Signup(w http.ResponseWriter, req *http.Request) {
	var user data.User
	if AlreadyLoggedIn(req) {
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

		if _, ok := data.DbUsers[user.UserName]; ok {
			http.Error(w, "Username already taken", http.StatusForbidden)
			return
		}

		sID := uuid.NewV4()
		cookie := &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
		http.SetCookie(w, cookie)
		data.DbSessions[cookie.Value] = user.UserName
		data.DbUsers[user.UserName] = user
		http.Redirect(w, req, "/posts", http.StatusAccepted)
	}
}

func Logout(w http.ResponseWriter, req *http.Request) {
	if !AlreadyLoggedIn(req) {
		http.Redirect(w, req, "/login", http.StatusForbidden)
		return
	}

	cookie, _ := req.Cookie("session")
	delete(data.DbSessions, cookie.Value)
	// remove the cookie
	cookie = &http.Cookie{
		Name:   "session",
		Value:  "",
		MaxAge: -1,
	}
	http.SetCookie(w, cookie)

	http.Redirect(w, req, "/login", http.StatusOK)
}

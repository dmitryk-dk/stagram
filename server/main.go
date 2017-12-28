package main

import (
	"net/http"
	"time"
	"golang.org/x/crypto/bcrypt"
	"github.com/dmitryk-dk/stagram/server/data"
	appHandlers "github.com/dmitryk-dk/stagram/server/handlers"	
)

func init() {
	bp, _ := bcrypt.GenerateFromPassword([]byte("password"), bcrypt.MinCost)
	data.DbUsers["test@test.com"] = data.User{"test@test.com", string(bp), "James"}
	appHandlers.DbSessionsCleaned = time.Now()
}

func main() {
	// listening port
	const port = ":3000"
	fs := http.FileServer(http.Dir("../public"))
	http.Handle("/public/", http.StripPrefix("/public/", fs))
	//start server
	http.Handle("/", http.HandlerFunc(appHandlers.ServeTemplate))
	http.Handle("/login", http.HandlerFunc(appHandlers.Login))
	http.Handle("/posts",http.HandlerFunc(appHandlers.Posts))
	http.Handle("/comments", http.HandlerFunc(appHandlers.Comments))
	http.Handle("/signup", http.HandlerFunc(appHandlers.Signup))
	http.Handle("/logout", http.HandlerFunc(appHandlers.Logout))
	http.Handle("/favicon.ico", http.NotFoundHandler())
	//stop server
	appHandlers.PrepareShutdown()
	// listen and server
	http.ListenAndServe(port, nil)
}


package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	appHandlers "github.com/dmitryk-dk/stagram/server/handlers"
)

func main() {
	// listening port
	const port = "3000"
	// init mux router
	router := mux.NewRouter()
	// init index.html
	router.Handle("/", http.FileServer(http.Dir("../build/")))

	// response static data
	router.PathPrefix("/").Handler(
		http.StripPrefix("/",
		http.FileServer(http.Dir("../build/"))))
	fmt.Printf("Running server on port: %s\n Type Ctr-c to shutdown server.\n", port)
	portConn := fmt.Sprintf(":%s", port)
	// routes handlers
	router.Handle("/", appHandlers.StatusHandler()).Methods("GET")
	router.Handle("/posts", appHandlers.PostsHandler()).Methods("GET")
	//router.Handle("/products/{slug}/feedback", appHandlers.AddFeedbackHandler()).Methods("Post")
	router.Handle("/login", appHandlers.LoginHandler()).Methods("POST")

	//stop server
	prepareShutdown()
	//start server
	http.ListenAndServe(portConn, handlers.LoggingHandler(os.Stdout, router))
}

func prepareShutdown() {
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGKILL, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		log.Printf("Got signal %d", <-sig)
		os.Exit(0)
	}()
}


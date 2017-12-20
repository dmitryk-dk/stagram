package main

import (
	"encoding/json"
	//"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	//"github.com/gorilla/handlers"
	//"github.com/gorilla/mux"
	//appHandlers "github.com/dmitryk-dk/stagram/server/handlers"
	"github.com/dmitryk-dk/stagram/server/data"
)

type Data struct {
	Posts    interface{} `json:"posts"`
	Comments interface{} `json:"comments"`
}

var tmpl *template.Template

func init() {
	tmpl = template.Must(template.ParseGlob("../public/index.html"))
}

func main() {
	// listening port
	const port = ":3000"
	fs := http.FileServer(http.Dir("../public"))
	http.Handle("/public/", http.StripPrefix("/public/", fs))
	//start server
	http.Handle("/", http.HandlerFunc(serveTemplate))
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

func serveTemplate(w http.ResponseWriter, r *http.Request) {
	responsData := Data{
		data.Posts,
		data.PostsComments,
	}
	//fmt.Println(responsData)
	jsonData, _ := json.Marshal(responsData)
	//fmt.Println(jsonData)
	tmpl.ExecuteTemplate(w, "index.html",string(jsonData))
}

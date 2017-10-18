package handlers

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/dmitryk-dk/goAuth/token"
	"github.com/dmitryk-dk/stagram/server/data"
	"github.com/dmitryk-dk/stagram/server/models"
)

const (
	USERNAME = "username@user.com"
	PASSWORD = "password"
)

func StatusHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("API is up and running"))
	})
}

func PostsHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		posts := data.Posts
		payload, _ := json.Marshal(posts)

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(payload))
	})
}

//func AddFeedbackHandler() http.Handler {
//	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//		var product models.Product
//		vars := mux.Vars(r)
//		slug := vars["slug"]
//
//		for _, p := range models.Products {
//			if p.Slug == slug {
//				product = p
//			}
//		}
//
//		w.Header().Set("Content-Type", "application/json")
//		if product.Slug != "" {
//			payload, _ := json.Marshal(product)
//			w.Write([]byte(payload))
//		} else {
//			w.Write([]byte("Product Not Found"))
//		}
//	})
//}

func LoginHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var users *models.Users
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			log.Printf("parsing error: %v\n", err)
			w.Write([]byte("error"))
		}
		json.Unmarshal(body, &users)
		if users.Username == USERNAME && users.Password == PASSWORD {
			generetedToken := token.GenerateToken()
			w.Write(generetedToken)
		}
	})
}

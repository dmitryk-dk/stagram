package data

import (
	"time"
)

type User struct {
	UserName string `json:"login"`
	Password string `json:"password"`
	Nickname string `json:"nickName"`
}

type Credentials struct {
	UserName string `json:"login"`
	Password string `json:"password"`
}

type PostsData struct {
	Posts    interface{} `json:"posts"`
}

type CommentsData struct {
	Comments interface{} `json:"comments"`
}

type Endpoints struct {
	Login    string `json:"login"`
	Posts 	 string `json:"posts"`
	Comments string `json:"comments"`
	Signup 	 string `json:"signup"`
	Logout 	 string `json:"logout"`
	Comment  string `json:"comment"`
}

type Authorization struct {
	IsAuthed   bool `json:"isAuthed"`
}

type InitData struct {
	Endpoints `json:"endpoints"`
	Authorization
}

type Session struct {
	UserName 	 string
	LastActivity time.Time
}

var DbUsers = map[string]User{}
var DbSessions = map[string]Session{}

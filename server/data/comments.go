package data

type Comment struct {
	Text	string `json:"text"`
	User	string `json:"user"`
}

type Comments struct {
	Comment []Comment
}

var PostsComments = map[string]Comments{
	"BAhvZrRwcfu": Comments{
		Comment: []Comment{
				Comment{
					Text:"Totally need to try this.",
					User: "heavymetaladam",
				},
			},
		},
	"BAcyDyQwcXX": Comments{
		Comment: []Comment{
			Comment{
				Text:"Wes. WE should have lunch.",
				User: "jdaveknox",
			},
			Comment{
				Text:"#adults",
				User: "jdaveknox",
			},
			Comment{
				Text:"@jdaveknox yes!",
				User: "wesbos",
			},
			Comment{
				Text:"😍 love Hamilton!",
				User: "willowtreemegs",
			},
		},
	},
	"BAPIPRjQce9": Comments{
		Comment: []Comment{
			Comment{
				Text:"Those are cute! They're like silver dollar pancakes.",
				User: "rrsimonsen",
			},
			Comment{
				Text:"I like baby pancakes but gluten free please!! I'll bring the coffee!! See you in 6 days!!!!!! 😝😛😝♥️",
				User: "terzisn",
			},
			Comment{
				Text:"... and apparently growing baby. 👀. Yum.",
				User: "henrihelvetica",
			},
			Comment{
				Text:"@wesbos 👍 my daughter is a pancake eating machine!",
				User: "brentoage",
			},
			Comment{
				Text:"Nice stove!",
				User: "haaps",
			},
			Comment{
				Text:"Genius bottle use! Do you make a single batch of batter or make a lot and freeze it?",
				User: "gobananna",
			},
			Comment{
				Text:"@gobananna I just made a batch and put in in a FIFO bottle. Keeps in the fridge for a few days.",
				User: "wesbos",
			},
			Comment{
				Text:"@haaps thanks! It's a Jenn air - so nice to cool with!",
				User: "wesbos",
			},
			Comment{
				Text:"Where would you go and for how long, if you had location freedom? - Greg 🌎",
				User: "world_greg",
			},
		},
	},
}



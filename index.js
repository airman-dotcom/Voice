const express = require("express");
const http = require("http");
const port = process.env.PORT || 3000
const search = require("youtube-search")
const app = express();
const server = http.createServer(app);
 
var opts = {
    maxResults: 1,
    key: "AIzaSyBAbVsddgo7na5aKxKiKkFfR0HE6sM_xf0"
}

app.use(express.json())
app.use(express.static("public"))

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

server.listen(port, () => {
    console.log("Server started.")
})

app.post("/anthem", (req, res) => {
    let country = req.body.country;
    console.log(country)
    let string = `what is the national anthem of ${country}`
    search(string, opts, function(err, results) {
        if(err) return console.log(err);
      
        res.json({link: results[0].id})
      });
})

app.post("/play", (req, res) => {
    let words = req.body.words;
    search(words, opts, function(err, results){
        if (err) return console.log(err)

        res.json({link: results[0].id})
    })
})

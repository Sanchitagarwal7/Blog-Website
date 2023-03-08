//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");

const homeStartingContent = "Today, I am thrilled to introduce you to a personal blog website that is sure to capture your attention and inspire you in countless ways. This website is a platform for the author to share their thoughts, experiences, and insights with the world, and it is a testament to the power of self-expression and creativity.The personal blog website is a space for the author to showcase their unique voice and perspective. The website is an extension of their personality and allows them to connect with readers on a deeper level. The author's writing is honest, authentic, and vulnerable, drawing readers in and inspiring them to reflect on their own lives and experiences..";
const aboutContent = "This website is made by Sanchit Agarwal, a 2nd year college student from a small but beautiful city, Bareilly. He is enthusiastic and hard working towards his life goals and does what is necessary to achieve them"
const contactContent = "You can contact us"

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


let posts = [];

app.get('/', function(req, res){
  res.render('home',{homeContent: homeStartingContent, postArray: posts});
});
app.get('/about', function(req, res){
  res.render('about', {aboutMe: aboutContent})
});
app.get('/contact', function(req, res){
  res.render('contact', {contactMe: contactContent})
});
app.get('/compose', function(req, res){
  res.render('compose');
});

app.post('/compose', function(req, res){

  const post = {

    title: req.body.postTitle,
    body: req.body.postBody

  };

  posts.push(post);

  res.redirect('/');

});

app.get('/posts/:postName', function(req, res){

  const target = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    if(_.lowerCase(post.title) === target){
      res.render('post', {Title: post.title, Body: post.body})
    }
  })
});









app.listen(3000, function() {
  console.log("Server started on port 3000");
});

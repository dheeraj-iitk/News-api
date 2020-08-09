var express=require("express");
var app=express();
var path=require("path");
var request=require("request");
app.set('views', __dirname + '/views'); //serve views
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));//serve static files
var title=[];
var description=[];
var urls=[];
var author =[];
var time=[];
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
app.get("/",function(req,res){
    res.render("index");
})
app.get("/headlines",function(req,res){
   
      // To query /v2/everything
      // You must include at least one q, source, or domain
     
      // To query sources
      // All options are optional
     /* newsapi.v2.sources({
        category: 'technology',
        language: 'en',
        country: 'in'
      }).then(response => {
        res.send(response.sources);
        
          {
            status: "ok",
            sources: [...]
          }
        
      });*/
      let url = ` http://newsapi.org/v2/top-headlines?country=in&apiKey=869dfb4183134af3b0ad2c06ed0e791e`
      request(url, function (err, response, body) {
          if(err){
            res.send(err);
          } else {
            let weather = JSON.parse(body) //contains all information about news
            for(i=0;i<3;i++){
                title.push(weather.articles[i].title)
            }
            for(i=0;i<3;i++){
               description.push(weather.articles[i].description)
            }
            for(i=0;i<3;i++){
                author.push(weather.articles[i].author)
             }
             for(i=0;i<3;i++){
                urls.push(weather.articles[i].url)
             }
             for(i=0;i<3;i++){
                time.push(weather.articles[i].publishedAt)
             }
            if(weather.status == undefined){ 
                console.log(weather.status);
              res.send("there is a error");
            } else {
               console.log(weather);
// let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;//the body(weather) contains every thing about the city
     
res.render("article",{title:title,description:description,author:author,urls:urls,time:time});
            // console.log(weather.articles[2].title);
            title=[];
description=[];
urls=[];
author =[];
time=[];

            }
          }
        });    
});

app.get("/sports",function(req,res){
    let url = "http://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=869dfb4183134af3b0ad2c06ed0e791e"
    request(url, function (err, response, body) {
        if(err){
          res.send(err);
        } else {
          let weather = JSON.parse(body) //contains all information about news
          for(i=0;i<3;i++){
              title.push(weather.articles[i].title)
              console.log(title[0])
          }
          for(i=0;i<3;i++){
             description.push(weather.articles[i].description)
          }
          for(i=0;i<3;i++){
              author.push(weather.articles[i].author)
           }
           for(i=0;i<3;i++){
              urls.push(weather.articles[i].url)
           }
           for(i=0;i<3;i++){
              time.push(weather.articles[i].publishedAt)
           }
          if(weather.status == undefined){ 
              console.log(weather.status);
            res.send("there is a error");
          } else {
             console.log(weather);
// let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;//the body(weather) contains every thing about the city
   
res.render("article",{title:title,description:description,author:author,urls:urls,time:time});
          // console.log(weather.articles[2].title);
          title=[];
description=[];
urls=[];
author =[];
time=[];

          }
        }
      });    
})

app.listen("3000",function(req,res){
    console.log("server is ruuning")
})
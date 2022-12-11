const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
app.set("view engine","ejs");
app.use(express.static("public"));
mongoose.set("strictQuery",true);
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true});
const articleSchema = mongoose.Schema({
  title:String,
  content:String,
});
const Article = mongoose.model("Article",articleSchema);
app.route("/articles")
.get(function(req,res){
    Article.find(function(err,articles){
      if(!err){
        res.send(articles);
      }
      else{
        res.send(err);
      }
    });
  })
.post(function(req,res){
  const article = new Article({
    title:req.body.title,
    content:req.body.content,
  });
  article.save(function(err){
    if(!err){
      res.send("Successfully saved!!");
    }else{
      res.send(err);
    }
  });
})
.delete(function(req,res){
  Article.deleteMany(function(err){
    if(!err){
      res.send("Successfully deleted all articles");
    }
    else{
      res.send(err);
    }
  });
});
app.route("/articles/:type").get(function(req,res){
  Article.findOne({title:req.params.type},function(err,article){
    if(!err){
      if(!article){
        res.send("Error:404 :(");
      }
      else{
        res.send(article);
      }
      res.send(article);
    }else{
      res.send(err);
    }
  });
}
).put(function(req,res){
  Article.update({
    title:req.params.type
  },{title:req.body.title,content:req.body.content},{overwrite:true},function(err){
    if(!err){
      res.send("Successfully replaced the article!!");
    }else{
      res.send(err);
    }
  });
}).patch(function(req,res){
  Article.update({title:req.params.type},{$set:req.body},function(err){
    if(!err){
      res.send("Updated the article Successfully!!");
    }
    else{
      res.send(err);
    }
  });
}).delete(function(req,res){
  Article.deleteOne({title:re.params.type},function(err){
    if(!err){
      res.send("Deleted Successfully!!");
    }
    else{
      res.send(err);
    }
  });
});
app.listen(3000,function(){
  console.log("Server is running on port 3000");
});

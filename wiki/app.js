const express=require('express');
const mongoose=require('mongoose');
const URL='mongodb://127.0.0.1:27017/wikiDB';
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect(URL,{useNewUrlParser: true, useUnifiedTopology: true});
const articleSchema=mongoose.Schema({title:String,content:String});
const Article=mongoose.model('Article',articleSchema);
app.route('/Article')
.get(function(req,res){
  Article.find(function(err,articles){
    if(err)console.error(err);
    res.send(articles);
  })
})
.post(function(req,res){
  const article=new Article({title:req.body.title,content:req.body.content});
  article.save();
})
.delete(function(req,res){
  Article.deleteMany(function(err){
    if(err)console.error(err);
    console.log('Successfully Deleted all Documents!');
  })
});
app.route('/Article/:title')
.get(function(req,res){
  Article.findOne({title:req.params.title},function(err,article){
    if(err)console.error(err);
    res.send(article);
  })
})
.put(function(req,res){

})
.patch(function(req,res){

})
.delete(function(req,res){
Article.deleteOne({title:req.params.title},function(err){
  if(err)console.error(err);
  console.log(('Successfully Deleted1 document!'));
})
});
app.listen(3000,function(err){
  if(err)console.error(err);
  console.log('Service Started Successfully');
})

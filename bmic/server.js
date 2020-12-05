const express=require('express');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extuended:true}));
app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
})
app.post('/',function(req,res){
  var m=Number(req.body.m);
  var h=Number(req.body.h);
  var bmi=m/(h*h);
  res.send('Your bmi is '+bmi);
})
app.listen(3000,function(req,res){
  console.log('server running at port 3000!');
})

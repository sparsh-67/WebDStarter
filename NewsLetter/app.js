const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');
const request=require('request');
const app=express();


const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
  apiKey: '',
  server: 'us7',
});

async function callPing() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

callPing();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
})
app.post('/',function(req,res){
  const FName=req.body.fname;
  const LName=req.body.lname;
  const email=req.body.email;
  const options = {
    method : 'POST',
    headers : {
      'Authorization' : 'Basic'
    }
  }
  const data={
    members:[{
      email_address : email,
      status:'subscribed',
      merge_fields:{
        FNAME:FName,
        LNAME:LName
      }
    }
    ]
  }
  const jsonData=JSON.stringify(data);
  const url='https://us7.api.mailchimp.com/3.0/lists/';
  const request=https.request(url,options,function(response){
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();

})

app.post('/failure',function(req,res){
  res.redirect('/');
})
app.listen(process.env.PORT||3000,function(){
  console.log('service started successfully!');
})

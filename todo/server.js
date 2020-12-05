const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const date=require(__dirname+'/date.js');
const mongoose=require('mongoose');
const URL='mongodb://127.0.0.1/todoListDb';
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology: true});
const itemSchema= mongoose.Schema({name:String});
const listSchema=mongoose.Schema({listName:String,items:[itemSchema]});
const Item=mongoose.model('Item',itemSchema);
const List=mongoose.model('List',listSchema);
const defaultItems=[{name:'start Creating your todo-list Now!'}];
app.get('/',function(req,res){
  Item.find(function(err,items){
    if(err)console.error(err);
    console.log(items);
    if(items.length===0){
      Item.insertMany(defaultItems,function(err,docs){
        if(err)console.error(err);
        console.log('successfully initialized!');
        res.redirect('/');
      })

    }
    else{

      res.render('list',{kindOfDate:'Today',list:items});
    }
  })
})
app.post('/',function(req,res){
  let item=req.body.item;
  let btn=req.body.btn;
  const newItem=new Item({name:item});
  if(btn=='Today'){
  Item.create(newItem,function(err,docs){
    if(err)console.error(err);
    console.log('successfully inserted!');
  })
  res.redirect('/');
}else{
  List.findOne({listName:btn},function(err,list){
    if(err)console.error(err);
    list.items.push(newItem);
    list.save();
    res.redirect('/'+btn);
  })
}
})
app.get('/:newTodoList',function(req,res){
  const newTodoList=req.params.newTodoList;
  List.findOne({listName:newTodoList},function(err,list){
    if(err)console.error(err);
    if(!list){
      const newList=new List({listName:newTodoList,items:defaultItems});
      List.create(newList,function(err,list){
        if(err)console.error(err);
         res.redirect('/'+newTodoList);
      })
    }else{
      res.render('list',{kindOfDate:newTodoList,list:list.items});
    }
  })

})
app.listen(3000,function(){
  console.log('service started successfully!');
})

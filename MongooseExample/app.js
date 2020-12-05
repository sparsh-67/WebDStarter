const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/shopDb2',{ useUnifiedTopology: true,useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are now connected!');
  const fruitSchema = new mongoose.Schema({name: String,rating:Number,trait:String});
  const Fruit=mongoose.model('Fruit',fruitSchema);
  // const apple = new Fruit({ name: 'apple',rating:8,trait:"Decent fruit!" });
  // apple.save(function (err, apple) {
  //   if (err) return console.error(err);
  // });
  // const orange = new Fruit({ name: 'orange',rating:6,trait:"Kinda sour!" });
  // const banana = new Fruit({ name: 'banana',rating:7,trait:"sweet and sticky fruit!" });
  // Fruit.insertMany([orange,banana],function(err,docs){
  //   if(err)console.error(err);
  //   console.log(docs);
  // })
  // const res = Fruit.updateOne({ name: 'apple' }, { name: 'NewGreenApple' },function(err,docs){
  //   if(err)console.error(err);
  //   console.log(docs);
  // });
  Fruit.deleteOne({name:'orange'},function(err,docs){
    if(err)console.error(err);
    console.log(docs);
  })
  Fruit.find(function(err,fruit){
    if(err)console.console.error(err);
    console.log(fruit);
  });

});

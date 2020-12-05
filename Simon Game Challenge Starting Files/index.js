var color=['green','red','blue','yellow'];
var score=0;
function move(x){
  var audio=new Audio('sounds/'+color[x]+'.mp3');
  audio.play();
  $("#"+color[x]).fadeOut(100).fadeIn(100);
}
var x=0;
$(document).keypress(function(){
  x=Math.floor(4*Math.random());
  move(x);

  var level=(Math.floor((score)/5)+1);
  $('#level-title').text('level '+level);
});
$('.btn').click(function(){
  var audio=new Audio('sounds/'+this.id+'mp3');
  audio.play();
  if(color[x]!=this.id){
    var audio=new Audio('sounds/wrong.mp3');
    audio.play();
    score=0;
    $('#level-title').text('opps! click any key to replay.');
  }else{
    score++;
    x=Math.floor(4*Math.random());
    var level=(Math.floor((score)/5)+1);
    $('#level-title').text('level '+level);
    move(x);
  }
})

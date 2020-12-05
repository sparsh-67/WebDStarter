var p1=Math.floor(6*Math.random())+1;
var p2=Math.floor(6*Math.random())+1;
if(p1==p2){
  document.querySelector("h1").innerHTML="oh! it's a draw";
}
if(p1>p2){
  document.querySelector("h1").innerHTML="🚩Player1 wins!";

}
if(p1<p2){
  document.querySelector("h1").innerHTML="🚩Player2 wins!";
}
var d1="./images/dice"+p1+".png";
var d2="./images/dice"+p2+".png";
document.querySelector('.img1').setAttribute("src",d1);
document.getElementsByClassName('img2')[0].setAttribute("src",d2);

// button click event
var nob=document.querySelectorAll('.drum').length;
for(var i=0;i<nob;i++){
  document.querySelectorAll('.drum')[i].addEventListener('click',function(event){
    var key=this.innerHTML;
    makeSound(key);
  });
}
// key-press event
document.addEventListener('keydown',function(event){
  makeSound(event.key);
})
// makeSound
function makeSound(key){
  var cn='.'+key;
  document.querySelector(cn).classList.add('press');
  setTimeout(function(){
    document.querySelector(cn).classList.remove('press');
  },1000)
  switch(key){
    case 'w':
            tom1=new Audio('sounds/tom-1.mp3');
            tom1.play();
            break;

    case 'a':
              tom2=new Audio('sounds/tom-2.mp3');
              tom2.play();
              break;

    case 's':
              tom3=new Audio('sounds/tom-3.mp3');
              tom3.play();
              break;

    case 'd':
              tom4=new Audio('sounds/tom-4.mp3');
              tom4.play();
              break;

    case 'j':
              snare=new Audio('sounds/snare.mp3');
              snare.play();
              break;

    case 'k':
              kickbass=new Audio('sounds/kick-bass.mp3');
              kickbass.play();
              break;

    case 'l':
              crash=new Audio('sounds/crash.mp3');
              crash.play();
              break;
    default:;
  }
}

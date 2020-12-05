const options={
  weekday:'long',
  year:'numeric',
  day:'2-digit',
  month:'long'
}
const today=new Date().toLocaleString('en-US',options);
exports.getDate=function(){
  return today;
}
exports.getDay=function(){
  return today.weekday;
}

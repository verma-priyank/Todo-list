
module.exports = date ;

function date(){
const date = new Date();
//   const day = date.getDay()
  var options = {
    weekday:"long",
    day: "numeric" ,
    month:"long"
  }
  var week = date.toLocaleDateString( "en-IN",options)

return week ;
}
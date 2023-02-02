const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const app = express();
var items =["Buy Food" , "Cook Food" , "Eat Food"]
app.set('view engine','ejs')


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.get("/" , (req, res)=>{
  const date = new Date();
//   const day = date.getDay()
  var options = {
    weekday:"long",
    day: "numeric" ,
    month:"long"
  }
  var week = date.toLocaleDateString( "en-IN",options)
  
  res.render('weekend' , {weekday:week , newitem:items})
    
    
})
app.post("/" ,(req,res)=>{
   
    const item = req.body.list ;
    items.push(item)
    res.redirect("/")
})
app.listen(3000 ,()=>{
    console.log("server is running on port 3000")
})
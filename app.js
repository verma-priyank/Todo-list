const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const app = express();
var items =["Buy Food" , "Cook Food" , "Eat Food"]
app.set('view engine','ejs')
var work =[];


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
    
    if(req.body.submit==="work"){
      console.log(req.body.submit)
      work.push(item)
      res.redirect("/work")
    }else{
      console.log(req.body)
      items.push(item)
    res.redirect("/")
    }
    
})
app.get("/work" , (req,res)=>{
  res.render("weekend" ,{weekday:"work" , newitem:work} )
})
// app.post("/work" , (req,res)=>{
//   const item = req.body.list;
//   console.log("item2")
//   work.push(item)
//   res.redirect("/work")
// })
app.get("/about" , (req,res)=>{
  res.render("about")
})

app.listen(3000 ,()=>{
    console.log("server is running on port 3000")
})
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")
const day = require(__dirname+"/date.js")
const app = express();
const _ = require("lodash")
var items =["Buy Food" , "Cook Food" , "Eat Food"]
app.set('view engine','ejs')
var work =[];

const week = day();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/todolistDB" ,{useNewUrlParser:true} );
const todoSchema = new mongoose.Schema({
  name:{
    type:String
  }
})
const todoItem = mongoose.model("Item" , todoSchema)
const categorySchema = new mongoose.Schema({
  name:String,
  item :[todoSchema]
})

const categoryItem = mongoose.model("Categoryitem" , categorySchema)
app.get("/" , (req, res)=>{
  
  todoItem.find({} , (err , result)=>{
    if(err){
      console.log(err)
    }else{
      console.log(result)
      res.render('weekend' , {weekday:week , newitem:result})
    }
  })
  
    
    
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
      const list = new todoItem({
        name:item
      })
      list.save()
      
    res.redirect("/")
    }
    
})
// app.get("/:category" , (req,res)=>{
  
//   const newcategory = req.params.category
//   const newlistitem = req.body.list ;
//   categoryItem.find({name:newcategory} , (err,result)=>{
//     if(err){
//       const listitem = new categoryItem({
//         name:newcategory,
//         item:newlistitem
//       })
//       listitem.save();
//     }else{
      

//     }
//   })
  
// })
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
app.post("/delete",(req,res)=>{
  console.log(req.body.checkbox)
  const deleteid = req.body.checkbox;
  todoItem.findByIdAndRemove(deleteid,(err)=>{
    if(err){
      console.log(err)
    }else{
      console.log("deleted successfully")
    }
  })
  res.redirect("/")
})
app.listen(3000 ,()=>{
    console.log("server is running on port 3000")
})
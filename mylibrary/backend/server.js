const express = require("express");
const app = express();
const port = 4000;

var cors = require('cors')
app.use(cors())
app.use(express.json())


const {MongoClient} = require('mongodb');
const { getNextKeyDef } = require("@testing-library/user-event/dist/keyboard/getNextKeyDef");
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const databaseName = 'testo7';



app.post("/register",(req,res)=> {
  res.send("this hello from register page <br/>");
    const name = req.body;
    //console.log(req.body);

    async function getData(){
      let result =await client.connect();
      let db = result.db(databaseName);
      let collection = db.collection('Details');
      //let response = await collection.find({}).toArray();
      var obj =[
          {
            "name": req.body.name,
            "email": req.body.email,
            "role": req.body.role,
            "contact": req.body.contact,
            "address": req.body.address,
            "pass": req.body.pass
          }];
      collection.insertMany(obj,function(err,res){
        if(err)throw err;
        console.log("inserted");
        console.log(obj);
      })
      
    }
    getData();
});








app.post("/signin",(req,res, next)=> {
    res.send("hello! welcome to my page <br/>");
    //console.log(req.body);

 
    async function getData(){
      let result =await client.connect();
      let db = result.db(databaseName);
      let collection = db.collection('Details');
      
      const email = req.body.email;
      const pass = req.body.password;
      const user = await collection.findOne({email , pass})
      if(!user){
        console.log("Email or Password not found in database")
      }else{
        console.log("success")
      }

      
    }
    getData();
    
});




app.listen(port, ()=>{
    console.log(`listening to port no ${port}`);
});
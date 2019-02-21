const express = require('express');
const app = express();
const request=require('request');
const bodyParser=require('body-parser');
const nodeMailer = require('nodemailer');
const mongoose = require('mongoose');
const URL="mongodb://DrewMo:abc123@ds147592.mlab.com:47592/heroku_9tf9mxdr"


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

let firstName;
let lastName;
let email;
let phoneNumber;
let subject;
let message;
let railbotsMessage={};

function sendMessage(messageObject){

     let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'railbotsmessenger@gmail.com',
          pass: 'shutUpAndrew'
        }
      });
      
      let mailOptions = {
        from: 'railbotsmessenger@gmail.com',
        to: 'robotics@lpps.info',
        subject: messageObject.subject,
        text: "Name:"+messageObject.firstName+messageObject.lastName+"\n"+
        "Email:"+messageObject.email+"\n"+
        "Phone Number:"+messageObject.phoneNumber+"\n"+
        "Message:"+"\n"+messageObject.message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}



  //mongoose.connect("mongodb://localhost:27017/railbots", { useNewUrlParser: true });
  mongoose.connect(URL, { useNewUrlParser: true });

  //Member Schema
 let memberSchema= new mongoose.Schema({
    firstName: String,
    lastName: String,
    year: String,
    gradYear: String
});

let members=mongoose.model("Member",memberSchema);
//



app.get("/",(req,res) =>{res.redirect("/home")});


app.get("/home",(req,res) =>{res.render("home.ejs")});

app.get("/photos",(req,res) =>{res.render("photos.ejs")});
app.get("/contact",(req,res) =>{res.render("contact.ejs")});

app.get("/members/edit",(req,res) => {res.render("edit.ejs")});

app.post("/members",(req,res) =>{

  let firstName=req.body.firstName;
  let lastName=req.body.lastName;
  let year=req.body.year;
  let gradYear=req.body.gradYear;

  
  let newMember={firstName: firstName, lastName: lastName, year:year , gradYear:gradYear};
  

  members.create(newMember,function(err,newMember){

      if(err){console.log(err);}
      else{
          res.redirect("/members");
          console.log(newMember);
  }
  });


});



app.get("/members",(req,res) =>{
  
  members.find({},function(err,members){

    
    if(err){console.log(err);}
    else{res.render("members.ejs",{members:members})}

    
  
});

});

app.get("/contact/confirmation",(req,res) =>{

    sendMessage(railbotsMessage);
    res.render("message.ejs",{firstName:firstName});
});
app.post("/contact/confirmation",(req,res) =>{

    firstName=req.body.firstName;
    lastName=req.body.lastName;
    email=req.body.email;
    phoneNumber=req.body.phoneNumber;
    subject=req.body.message;
    message=req.body.message;

    railbotsMessage={firstName:firstName,lastName:lastName,email:email,phoneNumber:phoneNumber,subject:subject,message:message};
    
    
   res.redirect("/contact/confirmation");
 });



app.listen(3000, () => console.log('Listening on port 3000!'));
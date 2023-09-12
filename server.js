const express= require('express');
const cors=require('cors');
const app=express();
const jwt=require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds=10;
const salt = bcrypt.genSaltSync(saltRounds);
const secret='dfjdfdkjnfdnfkjfdnfvdkjn'

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('DB URL');



const {Scema,model}=mongoose;

const UserSchema=new mongoose.Schema({
    name:{type:String, required:true,min:4,unique:true},
    email:{type:String,required:true},
    mobile:{type:String,required:true},
    password:{type:String,required:true},
  
});


const UserModel=model('User',UserSchema);



app.post('/register',async(req,res)=>{
    const {name,email,mobile,password}=req.body;

try{
    
    const userdoc=await User.create({username,
        password:bcrypt.hashSync(password, salt)
    
    })

    res.json(userdoc);
} catch(e){
 res.status(400).json(e)
}
})

app.post('/login',async (req,res)=>{

    const {username,password}=req.body;

    const userdoc=await User.findOne({username})
    if(!userdoc)  res.status(400).json('wrong credentials')
    const passok= bcrypt.compareSync(password, userdoc.password);
 if(passok)
 {
  jwt.sign({username,id:userdoc._id},secret,{},(err,token)=>{
    if(err)throw err;
    else
    res.cookie('token',token).json({
    id:userdoc._id,
    username
    });
  })
 }
 else 
 {
    res.status(400).json('wrong credentials')
 }

})
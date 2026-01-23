import express from 'express'
const app = express()

import cookieParser from 'cookie-parser'
import session from 'express-session'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import products from './data/products.js'
import {query,validationResult} from 'express-validator'

app.use(cookieParser())         //MW - Parses req.cookie
app.use(session({
    secret:'sample-secret',
    resave:false,
    saveUninitialized:false
}))

const users = []

app.use(express.json())
//cookie
app.get('/',(req,res)=>{
    console.log('Hello')
    res.cookie('name','express-app',{maxAge : 360000})
    res.send("Hello")
})

app.get('/fetch',(req,res)=>{
    console.log(req.cookies)
    res.send('API Called')
})

app.get('/remove-cookie',(req,res)=>{    //Manually Clearing cookie
    res.clearCookie('name')
    res.send("Cokkie cleared")
})

//session
app.get('/visit',(req,res)=>{
    if(req.session.page_views) {
        req.session.page_views++
        res.send(`You visited this page ${req.session.page_views} times`)
    } else{
        req.session.page_views=1
        res.send("Welcome to this page for the first time!")
    }
})

app.get('/remove-visit',(req,res)=>{
    req.session.destroy()
    res.send("Session Removed")
})

//Session based Authentication
app.post('/register',async (req,res) =>{
    const {username,password} = req.body
    users.push({
        username,
        password
    })
    res.send('User Registered')
}) 

app.post('/login',async (req,res) =>{
    const {username,password} = req.body
    const user = users.find(u=> u.username === username)
    if(!user || password !== user.password){
        return res.send('Not authorized')
    }
    else{
        req.session.user =user 
    }
    res.send('User LoggedIn')
}) 

app.get('/dashboard',(req,res) => {
    if(!req.session.user){
        return res.send('Unauthorized')
    }
    res.send(`Welcome , ${req.session.user.username}`)
})

//JWT based Authentication

app.post('/register1',async (req,res) =>{
    const {username,password} = req.body
    const hashedPassword = await bcrypt.hash(password,10)
    users.push({
        username,
        password:hashedPassword
    })
    res.send('User Registered')
})

app.post('/login1',async (req,res) =>{
    const {username,password} = req.body
    const user = users.find(u=> u.username === username)
    if(!user || !(await bcrypt.compare(password,user.password))){
        return res.send('Not authorized')
    }
    const token = jwt.sign({username},'test#secret')
    res.json({token})
}) 

app.get('/dashboard1',(req,res) => {
    try {
        const token = req.header("Authorization")
    const decodedToken = jwt.verify(token,'test#secret')
    if(decodedToken.username){
        res.send(`Welcome, ${decodedToken.username}`)
    }
    else{
        res.send('Acces Denied')
    }
    } catch (error) {
        res.send('Acces Denied')
    }
})


//RESTful API

app.get('/api/products',(req,res)=>{
    // const products = [
    //     {id:1,name:'Laptop',price:2000},
    //     {id:2,name:'Mobile',price:1000}
    // ]
    res.status(200).json({products})
})

app.get('/api/products/:id',(req,res)=>{
    // const products = [
    //     {id:1,name:'Laptop',price:2000},
    //     {id:2,name:'Mobile',price:1000}
    // ]
    const product = products.find( p=> Number(req.params.id) === p.id)
    if(!product){
       return res.status(400).json({message:'Product not Found'})
    }
    res.status(200).json({product})
})

app.post('/api/products',(req,res)=>{
    const newProduct = req.body
    newProduct.id = Date.now()
    res.status(201).json({newProduct})
})

//Validaton & Sanitization

app.get('/valid',query('uname').escape().trim().notEmpty().withMessage('name is Empty'),(req,res) =>{
    const result = validationResult(req)
    res.send(result)
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

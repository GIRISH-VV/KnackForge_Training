import express from 'express'
const app = express()

import cookieParser from 'cookie-parser'
import session from 'express-session'

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




app.listen(3000, () => {
  console.log("Server running on port 3000");
});

import express from 'express'
import { usernameController } from './controller.js'
import { searchController } from './controller.js'
import router from './route.js'
import middleware from './middleware.js'
import morgan from "morgan"
import multer from 'multer'        //Multer is required when your API needs to accept file uploads.
import { connectDB } from './models/config/db.js'

const app = express()
const upload = multer()

const PORT = 3000

//MongoDB
app.use(express.json());
await connectDB()
app.post('/person',(req,res)=>{
    console.log(req.body);
    res.send('Person Added')
})

app.use(express.urlencoded({extended:true}))        //Handling Form data in POSTMAN
app.use(upload.array())
app.post('/form',(req,res) =>{
    console.log(req.body)
    res.send('Form Created')
})

    //Serving static files
app.use(express.static('public'))       //only for GET,express.static() is a middleware that automatically serves multiple static files from a folder.

//Setting ejs as view engine - Template

app.set('view engine','ejs') 

app.get('/',(req,res) => {
    const userName = 'John Doe'
    res.render('html',{userName})
})

                                // M I D D L E W A R E 

app.use(middleware); 

app.use(morgan("dev"));

                                // G E T 

// app.get('/',(req,res) => {
//     console.log('After the middle ware')
//     res.send('Hello, Express')
// })

app.get('/about',(req,res) => {
    res.send(`This is the about route`)
})

app.get('/contact',(req,res) => {
    res.send(`This is the contact route`)
})

app.get('/error', () => {
    throw new Error('This is test error')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.send('Internal Server Error')
})

app.get('/users/:username',usernameController )

app.get('/search',searchController)

app.use('/user',router)

app.use(express.json())                                           // it commonly applies on post and put 

                                // P O S T

app.post('/users1', /*express.json() , */ (req,res)=>{        //express.json() => Middle man
    const {name,email} =req.body                             //Middle man user to parse data in req.body
    res.json({
        message:`User ${name} with email ${email} created Successfully`
    })
})
                                // P U T

app.put('/users1/:id', /*express.json() , */ (req,res) => {
    const userId = req.params.id
    const {name,email} =req.body
    res.json({
        message:`User ${userId} with email ${email} updated Successfully`
    })

})

                                // D E L E T E

app.delete('/users1/:id', /*express.json() , */ (req,res) => {
    const userId = req.params.id
    res.json({
        message:`User with ID ${userId} deleted Successfully`
    })

})

// Chain of Parameters

app.get('/things/:name/:id' , (req,res) => {
    const {name,id} = req.params
    res.json({
        name,
        id
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
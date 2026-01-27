import express from 'express';
import { connectDB } from './config/db.js';
import Person from './models/person.js';
import { Strategy as LocalStrategy } from 'passport-local';  //npm i passport passport-local
import  session  from 'express-session';
import { users } from './config/users.js';
import passport from 'passport';

const app = express();
app.use(express.json());
app.use(
    session({   
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000 // 1 hour
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy({usernameField: 'user_name',passwordField: 'password'},(username, password, done) => {
    const user = users.find(u => u.user_name === username);
    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    if (user.password !== password) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});



passport.deserializeUser(async (id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user || false);
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {

    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        message: info?.message || "Login failed"
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.json({
        message: "Login successful",
        user
      });
    });

  })(req, res, next);
});
                

await connectDB();  

app.get('/',(req,res)=>{
    res.send("Hello from Express and MongoDB");
});  

app.post('/person',express.json(),async (req,res)=>{
    try{
        const {email,name, age} = req.body;
        const newPerson = new Person({
            name,
            age,
            email,      
        });
        await newPerson.save();
        console.log(newPerson)
        res.send("Person data received");
    } catch(err){
        console.log("Error in saving person data", err); //in email defined unique so if we add same email for another document app will crash to overcome this we use try catch
    }
});

app.put('/person',express.json(),async (req,res)=>{
    const {email} = req.body;
    const personData = await Person.findOne({email}); //findByIdAndUpdate({email},{age:26};
     // find - get data with similar emal apply for all document  //find one - get single document which email has same
    //  //findById - mongodb id
    personData.age += 1;
    await personData.save();
    console.log(personData); 
    res.send("Person Updated");
});

app.delete('/person/:id',express.json(),async (req,res)=>{
    const {id} = req.params;
    await Person.findByIdAndDelete(id);
    console.log("Person Deleted");
    res.send("Person Deleted");
});

app.get('/person',async (req,res) =>{
    console.log("Fetching all persons");
    try {
        const getUser = await Person.find();
        res.json(getUser);
    } catch (error) {
        res.status(500).json({message: "Error fetching persons", error});
    }
})

app.post('/person' ,express.json(),async (req,res) => {
    const user = new Person(req.body);
    await user.save();
    res.send("Person created successfully");
})

app.put('/person/:id',express.json(),async (req,res)=>{
    await Person.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.send("Person updated successfully");

})

app.delete('/person/:id',async (req,res)=>{
    await Person.findByIdAndDelete(req.params.id);
    res.send("Person deleted successfully");
})

app.listen(3000,() =>{
    console.log("Server is running on port 3000");
}); 
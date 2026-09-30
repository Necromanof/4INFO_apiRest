const express = require("express");
const session = require("express-session");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(session({
    secret : process.env.SECRET_KEY,
    resave : false,
    saveUnitialized: false,
}));

//Middleware d'auth
const requireAuth = (req,res,next) => {
    if (req.session && req.session.user) {
        //If user is auth, continue
        return next();
    } else {
        //else, return  error
        return res.status(401).json({error : 'Unauthorized' });
    }
};



//Liste de user
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
  ];


//Route de connexion
app.post('/login', (req,res) => {
    const {username, password} = req.body;
    //Search if the user is on list
    const user = users.find(u => u.username === username && u.password === password);
    if(user){
        //Authen seccess, stock the user in the session
        req.session.user = user;
        res.json({message : 'Login successful'});
    } else {
        res.statusCode(401).json({ error : "Authentication failed" });
    }
});

//Get all users
app.get("/users",requireAuth, (req,res)=>{
   res.json(users);
});

//Road to logout
app.delete("/logout",requireAuth ,(req,res)=> {
    delete req.session.destroy(err => {
        if (err){
            res.status(500).json({ error : "Server error" });
        } else {
            res.json({message:"Logged out"});
        }
    });
});


//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

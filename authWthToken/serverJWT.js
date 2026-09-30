const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = 3000;
const secretKEY  = process.env.SECRET_KEY;

app.use(express.json());


const expiresIn = '1h';

//Liste de user
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
  ];

//Middleware d'auth
// const requireAuth = (req,res,next) => {
//     if (req.session && req.session.user) {
//         //If user is auth, continue
//         return next();
//     } else {
//         //else, return  error
//         return res.status(401).json({error : 'Unauthorized' });
//     }
// };


const requireAuth = (req,res,next) => {
    const notSplittedToken = req.headers.authorization;
    const splitted = notSplittedToken.split(' ');
    const token = splitted[1];
    console.log('Token : '+ token);

    if (token){
        jwt.verify(token, secretKEY , (err, decodedToken) => {

        if (err) {
            return res.status(401).json({error: 'Unauthorized'});
        } else {
            req.user = decodedToken;
            next();
        }
    });
    }else {
        return res.status(401).json({ error: 'Unauthorized'});
}};


//Route de connexion
app.post('/login', (req,res) => {
    const {username, password} = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if(user){
        const token = jwt.sign({username: user.username, id: user.id}, secretKEY, {expiresIn});
        res.json({token});
    } else {
        res.statusCode(401).json({ error : "Unauthorized" });
    }
});


//Get all users
app.get("/users",requireAuth, (req,res)=>{
    res.json(users);
 });



//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

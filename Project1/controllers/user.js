const User = require("../models/user");
const {v4:uuidv4} = require("uuid")
const {SetUser,GetUser, setUser} = require("../service/auth") 
async function handleUserSingup(req,res){
    const {name,email,password} = req.body
    const user = await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/")
}


async function handleAllUsers(req, res) {
  const users = await User.find({});
  res.render("users", { users });
}


async function handleUserLogin(req,res){
    const {name,email,password} = req.body
    const user = await User.findOne({
        email,password
    })

    if(!user){
       return res.render("login",{
   
        error:"Invalid email or password"
       })
    }

  
    const token = setUser(user)
    res.cookie("token",token);
    return res.redirect("/")
}




module.exports = { handleAllUsers ,handleUserSingup,handleUserLogin};
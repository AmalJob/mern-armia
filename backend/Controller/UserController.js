const User = require("../modal/UserModal");
const bcrypt = require("bcrypt");
const UserService = require("../services/UserServices");
const func = require("../fun");
const generateToken = require("../utils/generateToken");

// user register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserService.register(name, email, password);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// login

const login = async (req, res) => {
 
  try {
    const email = req.body.email
    const password = req.body.password
    const user = await UserService.login(email,password)
    if (user) {
        const token= generateToken(user._id)
        console.log("token",token);
      res.status(200).json({user,token});
    } else {
      res.status(401).json("Invalid Username or Password");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { register, login };

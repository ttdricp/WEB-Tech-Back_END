const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const  {validationResult} = require('express-validator')
const  {secret} = require("../config")
const {sign} = require("jsonwebtoken")


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload,
        secret,
        {expiresIn: "24h"})
}

class regController{
    async registration(req,res)
    {
      try{
          const errors = validationResult(req)
          if(!errors.isEmpty()){
              return res.status(400).json({message:"Enrollment error", errors})
          }
          const {email, name, password, re_pass} = req.body
          console.log(email,name,password, re_pass)

          if (!email && !name && !password && !re_pass) return res.send("Please enter all the fields");
          if (password != re_pass) return res.send("Passwords are not the same");

          const candidate = await User.findOne({email,name, password, re_pass})
          if(candidate){
              return res.status(400).json({message:"a user with the same name already exists"})
          }
          const hashPassword = bcrypt.hashSync(password, 7);
          const user = new User({email,name, password: hashPassword, re_pass: hashPassword, roles: ["USER"]})
          await user.save()
          return res.json({message:"User successfully registered"})
      }
      catch (e){
        console.log(e)
          res.status(400).json({message:'Registration error'})
      }
    }

        async login(req,res){
            try{
                const {username: name, password} = req.body
                const user = await User.findOne({username: name})
                if(!user)
                {
                    return res.status(400).json({message:"User "  + name + " is not found"})

                }
                const validPassword = bcrypt.compareSync(password, user.password)

                if(!validPassword)
                {
                    return res.status(400).json({message:'Entered wrong password'})
                }
                const token = generateAccessToken(user._id, user.roles)
                return res.json({message:'You successfully logged in'})


            }
            catch (e){
                console.log(e)
                res.status(400).json({message:'Login error'})
            }
        }
}


module.exports = new regController()
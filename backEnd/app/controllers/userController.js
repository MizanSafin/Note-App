import UsersModel from "../models/UsersModel.js"
import bcrypt from "bcrypt";
import { TokenEncode } from "../utilities/tokenUtility.js";

export const register = async(req,res)=>{
    try {
         let {name,email,password} = req.body;
         let user = await UsersModel.findOne({email});
       
         if(user){
            return res.status(401).json({success:false,message:"User already exist ."})
         }
         let hashedPassword =await bcrypt.hash(password , 10);
         let newUser =await UsersModel.create({name,password:hashedPassword,email});
         return res.status(201).json({success:true,user:newUser ,message:"User is registered successfully ."})
    } catch (error) {
        return res.status(500).json({ success: false ,message:error.message})
    }
}
export const login = async(req,res)=>{
    try {
         let {email,password} = req.body;
         let user = await UsersModel.findOne({email});
         
         if(!user){
            return res.status(401).json({success:false,message:"User doesn,t exist ."})
         }
         let comparePassword =await bcrypt.compare(password ,user.password);
         
         if(!comparePassword){
            return res
              .status(401)
              .json({ success: false, message: "Credentials fails" })
         }
         let token = TokenEncode(email,user._id)
         return res.status(201).json({success:true,user:user.name,userId:user._id,token ,message:"User is loggedIn successfully ."})
    } catch (error) {
        return res.status(500).json({ success: false ,message:error.message})
    }
}


export const getAllUsers = async(req,res)=>{
    try {
       let users = await UsersModel.find({});
       return res.status(200).json({success:true,users})
    } catch (error) {
        return res.status(500).json({success:false})
    }
}

export const verify = async(req,res)=>{
    try {
        let userId = req.headers.user_id;
       
        let user = await UsersModel.findById({_id:userId});
       
        if(!user){
            return res
              .status(404)
              .json({ success: false, message: "User not found / wrong credentials." })

        }
        return res.status(200).json({success:true,user,message:"user is verified successfully"})
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
        
    }
}
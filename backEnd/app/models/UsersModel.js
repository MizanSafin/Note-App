import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
       name:{type:String,required:true},
       email:{type:String,required:true,unique:true},
       password:{type:String,required:true}
},{timestamps:true,versionKey:false})


const UsersModel = mongoose.model("users",userSchema);

export default UsersModel;
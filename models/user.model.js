import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            unique:true,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true
        }
    }
)

userSchema.pre('save',  async function(next){
    this.password = await bcrypt.hash(this.password,10);
    next();
})

export const User = mongoose.model("User",userSchema);
import mongoose,{Schema } from "mongoose";

const userSchema = new Schema({

    username:{
        type:String,
        required:[true, "Please provide username"],
        unique: true 
    },

    email:{
        type:String,
        required:[true, "Please provide email"],
        unique:true
    },

    password:{
        type:String,
        required:[true, "Please provide password"]
    },

    isVerfied:{
        type:Boolean,
        default:false
    },

    isAdmin:{
        type:Boolean,
        default:false
    },

    verifyToken: String,

    verifyTokenExpiry: Date,

    forgotPasswordToken: String,

    forgotPasswordTokenExpiry: Date
    
},{timestamps:true});

export const User = mongoose.models.users || mongoose.model("users", userSchema);
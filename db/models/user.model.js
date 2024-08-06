import mongoose from "mongoose";
import { systemRoles } from './../../src/utils/sysremRoles.js';

const userScehma= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        minLength:4
    },
    lastName: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true,
        unique: true,
        default: function() {
          return `${this.firstName} ${this.lastName}`;
        }
      },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    recoveryEmail: {
        type: String
      },
      DOB: {
        type: String,
        required: true
      },
      mobileNumber: {
        type: String,
        required: true,
        unique: true
      },
      role: {
        type: String,
        enum: Object.values(systemRoles),
        default: 'User',
        required: true
      },
      status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline',
        required: true
      },
      confirmed:{
        type:Boolean,
        default:false
      },
      otp:{
        type:String
        
      }
},{
    versionKey:false,
   
})

const userModel = mongoose.model("user",userScehma)
export default userModel
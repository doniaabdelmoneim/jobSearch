import userModel from "../../../db/models/user.model.js"
import bcrypt from "bcrypt"
import  jwt from 'jsonwebtoken';
import { sendEmail } from "../../service/sendEmail.js";
import { asyncHandler } from "../../utils/globalErrorHandling.js";
import { AppError } from "../../utils/classError.js";
import applicationModel from './../../../db/models/application.model.js';
import jobModel from './../../../db/models/job.model.js';
import companyModel from './../../../db/models/company.model.js';
import {  nanoid } from "nanoid";

export const getUsers=async (req,res,next)=>{
    const users = await userModel.find()
    res.status(200).json({msg:"done",users})
};

export const signUp=asyncHandler(async (req,res,next)=>{
    const {firstName,lastName,email,recoveryEmail,password ,confirmPassword ,DOB ,mobileNumber,role,status}=req.body  
    const userExist = await userModel.findOne({email})
    if(userExist) {
        return next (new AppError("email already exist",409))
    }
    const existingMobileNumber = await userModel.findOne({ mobileNumber });
    if (existingMobileNumber) {
        return next (new AppError("Mobile number already exists",409))

    }


    const token=jwt.sign({ email }, process.env.signatureKey)
    const link=`http://localhost:3000/user/confirmEmail/${token}`
   
    const checkSendEmail= await sendEmail(email,"hi",`<a href=${link}>confirm your email</a>`)
    if(! checkSendEmail){
        return next(new AppError("email not sent please call tech team", 424))
    } 
    const hash =bcrypt.hashSync(password,Number(process.env.saltRound))
    if(password !== confirmPassword){
        return next (new AppError("password not match",401))
    }


const user=await userModel.create({firstName,lastName,email,password:hash ,recoveryEmail,confirmPassword ,DOB ,mobileNumber,role,status})
if(!user) {
        return next(new AppError("user not created",500))
    }

    res.status(200).json({msg:"created",user})
 
})

export const confirmEmail=asyncHandler(async (req,res,next)=>{
    const {token}=req.params
    const decoded = jwt.verify(token,process.env.signatureKey)
    if(! decoded.email){
        return next(new AppError("invalid token",498))

    } 
    const user = await userModel.findOneAndUpdate({email:decoded.email ,confirmed:false},{confirmed:true},{new:true})
    if(!user) {
        return next(new AppError("user not found or already confirmed",409))
   }
     res.status(200).json({msg:"done"})

})
   
export const signIn=asyncHandler(async (req,res,next)=>{
    const {email,password,recoveryEmail,mobileNumber}=req.body
    const user = await userModel.findOneAndUpdate({
        $or:[{email},{recoveryEmail},{mobileNumber}],confirmed:true
    },{status:"online"})
    if(!user || !bcrypt.compareSync(password,user.password) ) {
        return next (new AppError("email not exist or not confirmed email or password incorrect",401))
    }
    const token =jwt.sign({name:user.name , email:user.email},"donia",{expiresIn:"1h"})
    res.status(200).json({msg:"success",token})
})


// update account.
export const updateProfile=asyncHandler(async (req,res,next)=>{
    const userId = req.data._id;
    const { email, mobileNumber, recoveryEmail, DOB, lastName, firstName } = req.body;

    const existingUser = await userModel.findOne({
      $or: [
        { email: { $eq: email, $ne: userId } },
        { mobileNumber: { $eq: mobileNumber, $ne: userId } },
      ],
    });
    if (existingUser) {
        return next(new AppError('Email or mobile number already in use', 409));
    }
   // Update user account data
   const updatedUser = await userModel.findByIdAndUpdate(userId, {
    email,
    mobileNumber,
    recoveryEmail,
    DOB,
    lastName,
    firstName,
  }, { new: true });

   if (!updatedUser) {
       return next(new AppError('Failed to update user account', 500));
   }
  res.status(200).json({msg:"updated sucessfully",updatedUser})
});



//Delete account
export const deleteProfile=asyncHandler(async (req,res,next)=>{
    const user = await userModel.findOne({email:req.data.email})
    if(!user) {
        return next (new AppError("user not exist",404))
    }
    // Delete applications associated with the user
    await applicationModel.deleteMany({ userId: user._id });
    // Delete jobs associated with the user (if the user is a company HR)
    await jobModel.deleteMany({ addedBy: user._id });
    await companyModel.deleteMany({ companyHR: user._id });
    // Delete the user document
  await userModel.findOneAndDelete({email:req.data.email})
    res.status(200).json({msg:"Account deleted successfully"}) 
})


// Get profile data for another user 
export const getOtherProfile=asyncHandler(async (req,res,next)=> {
    const userId = req.query.userId;

      const user = await userModel.findById(userId);
      if (!user) {
        return next (new AppError("User not found",404))
      }
      res.status(200).json({msg:"success",user})
  });


// Get user account data
export const getProfile=asyncHandler(async (req,res,next)=>{
  const userId = req.data._id;
    const user = await userModel.findById(userId).select('-password');
    if (!user) {
      return next (new AppError("User not found",404))
    }
  res.status(200).json({msg:"success",user})
})

//  Update password  

export const updatePassword=asyncHandler(async (req,res,next)=>{
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Check if the user exists
    const user = await userModel.findOneAndUpdate({ email: req.data.email }, { status: "online" }, { new: true });
    if (!user ||!bcrypt.compareSync(currentPassword, user.password)) {
      return next (new AppError("Current password is incorrect",401))
    }

    // Check if the new password and confirm password match
    if (newPassword!== confirmPassword) {
      return next (new AppError("New password and confirm password do not match",400))
    }

    // Hash the new password
    const hashedPassword = bcrypt.hashSync(newPassword, Number(process.env.saltRound));

    // Update the user's password
    await userModel.findByIdAndUpdate(req.data._id, { $set:
    { password: hashedPassword } }, { new: true });
    res.status(200).json({msg:"Password updated successfully"})
    });




// 8. Forget password (make sure of your data security specially the OTP and the newPassword )  

export const forgetPassword=asyncHandler(async (req,res,next)=>{
  const { newPassword, email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next (new AppError("User not found",404))
  }
  const otp = nanoid(8);
  const hashedOtp = bcrypt.hashSync(otp, Number(process.env.saltRound));
  await userModel.findByIdAndUpdate(user._id, { $set:
  { otp: hashedOtp } }, { new: true });

  // Send the OTP to the user's recovery email
  const checkSendEmail= await sendEmail(
    email,
    "OTP",
    `Your OTP is ${otp}`
  )
const hashedNewPassword = await bcrypt.hash(newPassword, 10);
const updateUser = await userModel.findByIdAndUpdate(user._id, { $set:
  { password: hashedNewPassword } }, { new: true });
  res.status(200).json({ message: "New password created successfully" ,updateUser})
  })

   
// 9. Get all accounts associated to a specific recovery Email

export const getAllAccounts=asyncHandler(async (req,res,next)=>{
    const user = await userModel.find({ recoveryEmail: req.data.recoveryEmail });
    if (!user) {
      return next (new AppError("User not found",404))
    }

    res.status(200).json({msg:"success",user})

})
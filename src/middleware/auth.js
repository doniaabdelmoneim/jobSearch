import userModel from "../../db/models/user.model.js"
import  jwt from 'jsonwebtoken';
import { asyncHandler } from "../utils/globalErrorHandling.js";
import { AppError } from "../utils/classError.js";

export const auth=asyncHandler(async (req,res,next)=>{
    const {token}=req.headers
    if(! token){
        return next (new AppError("token not exist",400))
    }
    const decoded = jwt.verify(token,process.env.privateKey)
    const user = await userModel.findOne({email:decoded.email})
    if(!user) {
        return next (new AppError("token not exist",400))
    }
    req.data=user    
    next()
}
)

export const authorization= (roles=[])=>{
    return asyncHandler(async (req,res,next)=>{
            const {role}=req.data   
            if(!roles.includes(role)){
                return next (new AppError("you are not authorized",401))
            }
            next()
    }
    )

}
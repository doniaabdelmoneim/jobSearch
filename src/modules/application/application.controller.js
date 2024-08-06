import applicationModel from './../../../db/models/application.model.js';
import jobModel from '../../../db/models/job.model.js';
import { asyncHandler } from "../../utils/globalErrorHandling.js";
import { AppError } from "../../utils/classError.js";
import cloudinary from "../../utils/cloudinary.js";
import userModel from '../../../db/models/user.model.js';

// Add application
export const addApplication=asyncHandler(async (req,res,next)=>{
  const jobId = req.params.jobId;
  const job = await jobModel.findById(jobId);
  if (!job) {
      return next(new AppError('Job not found', 404));
  }
  const userId = req.data._id;
  const user = await userModel.findById(userId);
  if (!user) {
    return next(new AppError('Job not found', 404));
  }

  const { userTechSkills, userSoftSkills } = req.body;


  // Upload user resume to Cloudinary
  const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {
    folder: 'resumes'
    // resource_type: 'raw',
  });
  console.log(req.file);
  

  // Create new application

 await applicationModel.create({
    jobId:req.params.jobId,
    userId:req.data._id,
    userTechSkills,
    userSoftSkills,
    userResume:{secure_url,public_id},
  });
  res.status(201).json({ message: 'Application added successfully' });



})




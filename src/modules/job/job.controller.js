import jobModel from "../../../db/models/job.model.js";
import { AppError } from "../../utils/classError.js";
import { asyncHandler } from "../../utils/globalErrorHandling.js";
import applicationModel from './../../../db/models/application.model.js';
import companyModel from './../../../db/models/company.model.js';
import userModel from './../../../db/models/user.model.js';
import cloudinary from "../../utils/cloudinary.js";

// Add Job 
export const addJob=asyncHandler(async (req,res,next)=>{ 
    const { jobTitle, jobLocation, workingTime, seniorityLevel, jobDescription, technicalSkills, softSkills } = req.body;
    const job = await jobModel.create({jobTitle, jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills,
        addedBy: req.data._id,
      });

    res.status(200).json({msg:"created",job})
})

// GET ALL Jobs
export const getAllJobs=asyncHandler(async (req,res,next)=>{
    const jobs = await jobModel.find({})
    res.status(200).json({msg:"done",jobs})
})

//  update job data

export const updateJob= asyncHandler(async(req,res,next)=>{

    const job = await jobModel.findById(req.params.id);
    if (!job) {
      return next(new AppError('Job not found', 404));
    }
    const updateJob = await jobModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({msg:"updated",updateJob})
})

//  Delete job data

export const deleteJob= asyncHandler(async(req,res,next)=>{
    const job = await jobModel.findById(req.params.id);
    if (!job) {
      return next(new AppError('Job not found', 404));
    }
     // Delete applications associated with the job
     await applicationModel.deleteMany({ jobId: job._id });
     // Delete the job document
     await jobModel.findByIdAndDelete(req.params.id)
    res.status(200).json({message: 'Job deleted successfully' })
})

// Get all Jobs with their company’s information.

export const getJobsInfo= asyncHandler(async(req,res,next)=>{
  const jobs = [];
  const findjobs = await jobModel.find().populate("addedBy");
  await Promise.all(
    findjobs.map(async (job) => {
      const company = await companyModel.findOne({
        companyHR: job.addedBy,
      });

      jobs.push({ company, job });
    })
  );

  res.status(200).json({ data: jobs, message: 'done' })

})

// Get all Jobs for a specific company.
export const getCompanyJobs = asyncHandler(async (req, res, next) => {
  const companyName = req.query.companyName;
  if (!companyName) {
    return res.status(400).send({ message: 'Company name is required' });
  }

  const findCompany = await companyModel.findOne({ companyName });

  if (!findCompany) {
       return next(new Error('Company not found', 404 ));
  }
  const jobs = await jobModel.find({
    addedBy: findCompany.companyHR,
  });
  if (!jobs) {
    return next(new Error("There are no jobs for this company", 404));
  }

  res.status(201).json({msg:"done", jobs});
});


// Get all Jobs that match the following filters 


export const getFilteredJobs= asyncHandler(async(req,res,next)=>{
    const {workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills} = req.query;
    const query = {};
    if (workingTime) query.workingTime = workingTime;
    if (jobLocation) query.jobLocation = jobLocation;
    if (seniorityLevel) query.seniorityLevel = seniorityLevel;
    if (jobTitle) query.jobTitle = new RegExp(jobTitle, 'i');
    if (technicalSkills) query.technicalSkills =  { $in: filters.technicalSkills.split(',') };
    // if (jobTitle) query.title = { $regex: filters.jobTitle, $options: 'i' };

    const jobs = await jobModel.find(query);
    res.status(200).json({msg:"done",jobs})
})

// Apply to Job
export const applyToJob = asyncHandler(async (req, res,next) => {
      const jobId = req.body.jobId;
      const userId = req.data._id;
      const job = await jobModel.findById(jobId);
      if (!job) {
        return next(new AppError('Job not found', 404));
      }
      const user = await userModel.findById(userId);
      if (!user) {
        return next(new AppError('user not found', 404));
      }
      const existingApplication = await applicationModel.findOne({ jobId, userId});
      if (existingApplication) {
        return next(new AppError('You have already applied for this job.', 400));
    }
      
      const { userTechSkills, userSoftSkills } = req.body;
      // Upload user resume to Cloudinary
      const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder: 'resumes'
      });
      const application = await applicationModel.create({
        jobId:req.body.jobId,
        userId:req.data._id,
        userTechSkills,
        userSoftSkills,
        userResume:{secure_url,public_id}
      });
      res.status(201).json({ message: 'Application submitted successfully' ,application});
    })


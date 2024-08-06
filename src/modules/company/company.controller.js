import companyModel from "../../../db/models/company.model.js"
import userModel from "../../../db/models/user.model.js"
import { AppError } from "../../utils/classError.js"
import { asyncHandler } from "../../utils/globalErrorHandling.js"
import jobModel from './../../../db/models/job.model.js';
import applicationModel from './../../../db/models/application.model.js';


export const addCompany=asyncHandler(async (req,res,next)=>{
    const {companyName,description,industry,address,numberOfEmployees,companyEmail}=req.body
    const existingCompany = await companyModel.findOne({ companyEmail });
    if (existingCompany) {
        return next(new AppError('Email already exists', 400));
    }  
    const company = await companyModel.create({companyName,description,industry,address,numberOfEmployees,companyEmail,
    companyHR:req.data._id})
    res.status(200).json({msg:"created company ",company})
})


// GET ALL Companies
export const getAllCompanies=asyncHandler(async (req,res,next)=>{
    const companies = await companyModel.find({})
    res.status(200).json({msg:"done",companies})
})


//  update company data
export const updateCompany= asyncHandler(async(req,res,next)=>{
    const {companyName,description,industry,address,numberOfEmployees,companyEmail}=req.body
    const company = await companyModel.findById(req.params.id);
    if (!company) {
      return next(new AppError('Company not found', 404));
    }
    const existingCompany = await companyModel.findOne({ companyEmail });
      if (companyEmail == existingCompany) {
        return next(new AppError(" company Email already exist,409"));
      }  
    const updateCompany = await companyModel.findByIdAndUpdate(req.params.id,{companyName,description,industry,address,numberOfEmployees,companyEmail,
        companyHR:req.data._id},{new:true})
    res.status(200).json({msg:"updated",updateCompany})
})
  
//  Delete company data

export const deleteCompany= asyncHandler(async(req,res,next)=>{
  const companyId=req.params.id
    const company = await companyModel.findById(companyId);
    if (!company) {
      return next(new AppError('Company not found', 404));
    }
    await jobModel.deleteMany({ addedBy: req.data._id });
    await applicationModel.deleteMany({ jobId: { $in: company.jobs } });
    await userModel.deleteMany({ _id: req.data._id});
    await companyModel.findByIdAndDelete(companyId);
    res.status(200).json({msg:"Company data deleted successfully"})
})

// Get company data 

export const getCompany= asyncHandler(async(req,res,next)=>{
  const company = await companyModel.findById(req.params.id)
    if (!company) {
      return next(new AppError('Company not found', 404));
    }
    const jobs = await jobModel.find({ addedBy: company.companyHR });
    return res.json({msg:"done", company, jobs });
})


// Search for a company with a name. 

export const searchCompany= asyncHandler(async(req,res,next)=>{
    const name = req.query.name;
    const company = await companyModel.findOne({ companyName: name });
    if (!company) {
      return next(new AppError('Company not found', 404));
    }
    const companies = await companyModel.find({ companyName: { $regex: name, $options: 'i' } });
    res.status(200).json({msg:"done",companies})
})


// Get all applications for specific Job

export const getCompanyApplications= asyncHandler(async(req,res,next)=>{
    const jobId = req.params.jobId;
    const job = await jobModel.findById(jobId);

    if (!job) {
        return next(new AppError('Job not found', 404));
    }
    // Ensure the job belongs to the company of the HR
    if (job.addedBy.toString() !== req.data._id.toString()) {
        return next(new AppError('Access denied.', 403));
    }

    const applications = await applicationModel.find({ jobId })
        .populate('userId', ['firstName', 'lastName', 'email']); 
    res.status(200).json({msg:"done",applications})

})

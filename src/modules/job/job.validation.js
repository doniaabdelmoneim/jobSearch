import joi from "joi"

export const addJobValidation={
    body:joi.object({
        jobTitle: joi.string().required(),
        jobLocation: joi.string().required(),
        workingTime: joi.string().required(),
        seniorityLevel: joi.string().required(),
        jobDescription: joi.string().required(),
        technicalSkills: joi.array().required(),
        softSkills: joi.array().required(),
    })

};

export const updateJobValidation={
    body:joi.object({
        jobTitle: joi.string().required(),
        jobLocation: joi.string().required(),
        workingTime: joi.string().required(),
        seniorityLevel: joi.string().required(),
        jobDescription: joi.string().required(),
        technicalSkills: joi.array().required(),
        softSkills: joi.array().required(),
    })
};

export const deleteJobValidation={
  params:joi.object({
    id: joi.string().required(),
  })
};

export const getCompanyJobs={
  query:joi.object({
    companyName: joi.string().required(),
  })
};


export const applyToJobValidation={
  body:joi.object({
    userTechSkills: joi.array().items(joi.string()).required(),
    userSoftSkills: joi.array().items(joi.string()).required(),
  }),
    file:joi.object({
        size:joi.number().positive().required(),
        path:joi.string().required(),
        filename:joi.string().required(),
        encoding:joi.string().required(),
        originalname:joi.string().required(),
        fieldname:joi.string().required(),
        destination:joi.string().required(),
        mimetype:joi.string().required(),
      }).required
};






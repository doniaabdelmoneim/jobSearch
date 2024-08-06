import joi from "joi"
export const addApplicationValidation={
  
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

}


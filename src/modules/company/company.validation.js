import joi from "joi"


export const addCompanyValidation={
    body: joi.object({
        companyName:joi.string().required(),
        description:joi.string().required(),
        industry:joi.string().required(),
        address:joi.string().required(),
        numberOfEmployees:joi.string().required().pattern(/^(?:\d{1,3}-\d{1,3}|\d{1,3}\+)$/).messages({
            "string.pattern.base":"number of employees must be a valid format like 11-50 or 123+ or 123",
            "any.required":"number of employees is required"
        }),
        companyEmail:joi.string().email().required().messages({
            "string.email":"email must be a valid email",
            "any.required":"email is required"
        })
    }),
    Headers:joi.object({
        accept:joi.string(),
        "content-type":joi.string(),
        "user-agent":joi.string(),
        'cache-control':joi.string(),
        'postman-token':joi.string(),
        'content-length':joi.string(),
        'accept-encoding':joi.string(),
        host:joi.string(),
        connection:joi.string(),
        token:joi.string().required().messages({
            "any.required":"token is required"  
        })
    })
};

export const updateCompanyValidation={
    body: joi.object({
        companyName:joi.string().required(),
        description:joi.string().required(),
        industry:joi.string().required(),
        address:joi.string().required(),
        numberOfEmployees:joi.string().required().pattern(/^(?:\d{1,3}-\d{1,3}|\d{1,3}\+)$/).messages({
            "string.pattern.base":"number of employees must be a valid format like 11-50 or 123+ or 123",
            "any.required":"number of employees is required",
        }),    
        companyEmail:joi.string().email().required(),
    })
};

export const getCompanyValidation={
    params:joi.object({
        id:joi.string().required()

    })
};

export const searchCompanyValidation={
    query:joi.object({
        name:joi.string().required()
    })

};

export const deleteCompanyValidation={
    params:joi.object({
        id:joi.string().required()
    })
};



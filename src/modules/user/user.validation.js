import joi from "joi"
export const signUpValidation={
    body: joi.object({
        firstName:joi.string().min(3).max(30).alphanum().messages({
            "string.min":"name must be at least 3 characters",
            "string.max":"name must be at most 30 characters",
            "string.alphanum":"name must contain only letters and numbers",
            "any.required":"name is required"
        }),
        lastName:joi.string().min(3).max(30).alphanum().messages({
            "string.min":"name must be at least 3 characters",
            "string.max":"name must be at most 30 characters",
            "string.alphanum":"name must contain only letters and numbers",
            "any.required":"name is required"
        }),

        email:joi.string().email({tlds:{allow:["com","net"]}}).messages({
            "string.email":"email must be a valid email",
             "string.pattern.base":"email must contain @ and .com or .net",
             "any.required":"email is required"
        }),
        recoveryEmail:joi.string().email({tlds:{allow:["com","net"]}}).messages({
            "string.email":"email must be a valid email",
             "string.pattern.base":"email must contain @ and .com or .net",
             "any.required":"email is required"
        }),
    // Minimum eight characters, at least one letter and one number:
        password:joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)).messages({
            "string.pattern.base":"password must contain at least one letter and one number and at least 8 characters",
            "any.required":"password is required",
        }),
        confirmPassword :joi.string().valid(joi.ref('password')).messages({
            "any.only":"passwords don't match",
            "any.required":"confirm password is required"
        }),
        mobileNumber:joi.string().min(10).max(15).pattern(new RegExp(/^[0-9]+$/)).messages({
            "string.min":"phone must be at least 10 characters",
            "string.max":"phone must be at most 15 characters",
            "string.pattern.base":"phone must contain only numbers",
            "any.required":"phone is required"
        }),
  
        role:joi.string().valid('User', 'Company_HR').messages({
            "any.only":"role must be User or Company_HR",
            "any.required":"role is required"
        }),
        DOB:joi.string().messages({
            "any.required":"date of birth is required , must be date format 2023-12-4"
        })
    }).options({presence:"required"})

}

export const loginValidation= {
    body:joi.object({
        email:joi.string().email(),
        recoveryEmail:joi.string().email(),
        mobileNumber:joi.string().pattern(new RegExp(/^[0-9]+$/)).messages({
            "string.pattern.base":"phone must contain only numbers",
            "any.required":"phone is required"

        }),
        password:joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)).required()   
    })
}

export const getProfileValidation={
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

}

export const updateProfileValidation= { 
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
    }),
    body:joi.object({
        firstName:joi.string().min(3).max(30).alphanum().messages({
            "string.min":"name must be at least 3 characters",
            "string.max":"name must be at most 30 characters",
            "string.alphanum":"name must contain only letters and numbers",
            "any.required":"name is required"
        }),
        lastName:joi.string().min(3).max(30).alphanum().messages({
            "string.min":"name must be at least 3 characters",
            "string.max":"name must be at most 30 characters",
            "string.alphanum":"name must contain only letters and numbers",
            "any.required":"name is required"
        }),

        email:joi.string().email().messages({
            "string.email":"email must be a valid email",
             "any.required":"email is required"
        }),
        recoveryEmail:joi.string().email().messages({
            "string.email":"email must be a valid email",
             "any.required":"email is required"
        }),
        mobileNumber:joi.string().min(10).max(15).pattern(new RegExp(/^[0-9]+$/)).messages({
            "string.min":"phone must be at least 10 characters",
            "string.max":"phone must be at most 15 characters",
            "string.pattern.base":"phone must contain only numbers",
            "any.required":"phone is required"
        }),
        DOB:joi.string().messages({
            "any.required":"date of birth is required , must be date format 2023-12-4"
        })

    })

}

export const deleteProfileValidation= {

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

}

export const forgotPasswordValidation= {
    body:joi.object({
        email:joi.string().email().required(),
        newPassword:joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)).messages({
            "string.pattern.base":"password must contain at least one letter and one number and at least 8 characters",
            "any.required":"password is required",
        })

    })

}

export const updatePasswordValidation= {
    body:joi.object({
        currentPassword:joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)).messages({
            "string.pattern.base":"password must contain at least one letter and one number and at least 8 characters",
            "any.required":"password is required",
        }),
        newPassword:joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)).messages({
            "string.pattern.base":"password must contain at least one letter and one number and at least 8 characters",
            "any.required":"password is required",
        }),
        confirmPassword :joi.string().valid(joi.ref('newPassword')).messages({
            "any.only":"passwords don't match",
            "any.required":"confirm password is required"
        })
    })

}


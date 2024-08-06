import { Router } from "express";
import * as UC from './user.controller.js';
import { auth, authorization } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as UV from "./user.validation.js";
import { systemRoles } from './../../utils/sysremRoles.js';

const router=Router();

router.get("/",UC.getUsers)
router.post("/signup",validation(UV.signUpValidation),UC.signUp)
router.post("/signin",validation(UV.loginValidation),UC.signIn)
router.get("/profile",auth,authorization([systemRoles.companyHR, systemRoles.user]),UC.getProfile)
router.delete("/" ,validation(UV.deleteProfileValidation),auth,UC.deleteProfile)
router.patch("/" ,auth,UC.updateProfile)
router.get("/confirmEmail/:token",UC.confirmEmail)
router.post("/forgotPassword",validation(UV.forgotPasswordValidation),UC.forgetPassword)
router.post("/updatePassword",auth,validation(UV.updatePasswordValidation),UC.updatePassword)
router.get("/profileUser",UC.getOtherProfile)
router.get("/profiles",auth,UC.getAllAccounts)


export default router



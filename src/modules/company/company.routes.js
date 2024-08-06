import { Router } from "express";
import * as CC from './company.controller.js';
import { auth, authorization } from "../../middleware/auth.js";
import { validation } from './../../middleware/validation.js';
import * as CV from "./company.validation.js";
import { systemRoles } from "../../utils/sysremRoles.js";

const router=Router();

router.post('/',auth,authorization([systemRoles.companyHR]),validation(CV.addCompanyValidation),CC.addCompany)
router.put('/:id',auth,authorization([systemRoles.companyHR]),validation(CV.updateCompanyValidation),CC.updateCompany)
router.get('/data/:id',auth,authorization([systemRoles.companyHR]),CC.getCompany)
router.get('/search', auth,authorization([systemRoles.companyHR]),CC.searchCompany)
router.get('/job/:jobId', auth,authorization([systemRoles.companyHR]),CC.getCompanyApplications)
router.delete('/:id',auth,authorization([systemRoles.companyHR]),validation(CV.deleteCompanyValidation),CC.deleteCompany)




export default router
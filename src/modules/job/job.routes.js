import { Router } from "express";
import * as JC from './job.controller.js';
import { auth, authorization } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as JV from "./job.validation.js";
import { systemRoles } from "../../utils/sysremRoles.js";
import { multerHost, validExtension } from "../../service/multerLocal.js";

const router=Router();
router.get('/',JC.getAllJobs)
// router.post('/',auth,authorization([systemRoles.companyHR]),validation(JV.addJobValidation),JC.addJob)
router.post('/',auth,authorization(systemRoles.companyHR),
validation(JV.addJobValidation),JC.addJob)

router.patch('/:id',auth,authorization(systemRoles.companyHR),
validation(JV.updateJobValidation),JC.updateJob)

router.delete('/:id',auth,authorization(systemRoles.companyHR),
validation(JV.deleteJobValidation),JC.deleteJob)
router.get('/info',auth,authorization([systemRoles.companyHR,systemRoles.user]),JC.getJobsInfo)
router.get('/specific',auth,authorization([systemRoles.companyHR,systemRoles.user]),
validation(JV.getCompanyJobs),JC.getCompanyJobs)


router.get('/filter',auth,authorization([systemRoles.companyHR,systemRoles.user]),JC.getFilteredJobs)

router.post('/apply',auth,authorization([systemRoles.user]),multerHost(...validExtension.document).single('application'),
validation(JV.applyToJobValidation),JC.applyToJob)





export default router
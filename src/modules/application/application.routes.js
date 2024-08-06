import { Router } from "express";
import * as AC from './application.controller.js';
import { multerHost, validExtension } from "../../service/multerLocal.js";
import * as AV from './application.validation.js';
import { validation } from "../../middleware/validation.js";
import { auth, authorization } from './../../middleware/auth.js';
import { systemRoles } from "../../utils/sysremRoles.js";


const router=Router();
router.post("/:jobId",auth,authorization([systemRoles.user]),multerHost(...validExtension.document).single('application'),
validation(AV.addApplicationValidation),AC.addApplication)




export default router
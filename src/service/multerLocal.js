
import multer from "multer";
import { AppError } from "../utils/classError.js";
export const validExtension={
  image:['image/png'],
  document:['application/pdf']
}


export const multerHost=(customValidation=["'application/pdf"])=>{

  const storage = multer.diskStorage({});
    
     const fileFilter = (req, file, cb) => {
      if (customValidation.includes(file.mimetype)) {
        return cb(null, true);
      } else {
        cb(new AppError('file not supported',501),false)
      }
    };
  const upload= multer({fileFilter ,storage })
  return upload;
}


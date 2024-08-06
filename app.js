import express from 'express'
import dotenv from 'dotenv'
import companyRouter from './src/modules/company/company.routes.js'
import jobRouter from './src/modules/job/job.routes.js'
import applicationRouter from './src/modules/application/application.routes.js'
import userRouter from './src/modules/user/user.routes.js'
import connectiondb from './db/connectiondb.js'
import { AppError } from './src/utils/classError.js'
import { globalErrorHandler } from './src/utils/globalErrorHandling.js'
import * as path from 'path';


dotenv.config({path: path.resolve("config/.env")})
const app = express()
//connect to db
connectiondb()

app.use(express.json())
// routes
app.use('/company',companyRouter)
app.use('/job',jobRouter)
app.use('/application',applicationRouter)
app.use('/user',userRouter)


//handle invalid urls
app.use('*', (req, res,next) => {
   return next(new AppError(`invalid url ${req.originalUrl}`,404))
})

// global error handling 
app.use(globalErrorHandler)

app.listen(3000, () =>{ 
    console.log(`Example app listening on port !`)
})
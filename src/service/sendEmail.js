import  nodemailer from "nodemailer";

export const sendEmail=async(to,subject,html)=>{
    const transporter = nodemailer.createTransport({
        host: "localhost",
        service:"gmail",
        port: 587,
        secure: false, 
        auth: {
          user: process.env.userEmail,
          pass: process.env.passwordEmail,
        },
      });
      
        const info = await transporter.sendMail({
          from: '"Doniaa" <donia.abdelmoneim19@gmail.com>', 
          to: to ? to: "donia@gmail.com",
          subject: subject ? subject :"your OTP",
          html: html ?html :"<h1>hello</h1>" ,
        });
        if(info.accepted.length){
          return true;  
        }else{
            return false  
        }


}

import mongoose from "mongoose"

const connectiondb=async () =>{
    return await mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("connected to db")
    }).catch((err)=>{
        console.log("database connection error",err);
    })
}

export default connectiondb
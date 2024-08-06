import mongoose from "mongoose";

const applicationSchema =new mongoose.Schema({
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"job",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    userTechSkills: [
        {
          type: String,
          // trim: true,
          required: true

        }
      ],
      userSoftSkills: [
        {
          type: String,
          // trim: true,
          required: true
        }
      ],
      userResume:{
        secure_url: {
          type: String,
          required: true
        },
        public_id: {
          type: String,
          required: true
        }
      }
}, {
  timestamps: true
})

const applicationModel = mongoose.model("application",applicationSchema)
export default applicationModel
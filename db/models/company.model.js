import mongoose from "mongoose";

const companySchema =new mongoose.Schema({
    companyName: {
        type: String,
        unique: true,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      industry: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      numberOfEmployees: {
        type: String,
        enum: [
          '1-10',
          '11-20',
          '21-50',
          '51-100',
          '101-500',
          '501-1000',
          '1001+'
        ],
        required: true
      },
      companyEmail: {
        type: String,
        unique: true,
        required: true
      },
      companyHR: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
})

const companyModel = mongoose.model("company",companySchema)
export default companyModel
import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    location: { type: String, default: 'Remote' },
    type: { type: String, default: 'Full-time' },
    description: { type: String, required: true },
    requirements: [String],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Career', careerSchema);

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const trainerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    yearsExperience: {
      type: String,
      required: true,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    certifications: {
      type: String,
      default: '',
    },
    specialties: {
      type: [String],
      default: [],
    },
    gymLocation: {
      type: String,
      default: '',
    },
    userType: {
      type: String,
      default: 'trainer',
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
trainerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
trainerSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Trainer = mongoose.model('Trainer', trainerSchema);

export default Trainer;


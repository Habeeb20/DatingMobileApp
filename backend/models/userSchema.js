// Update to models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String,  },
  phoneNumber: { type: String,  },
  firstName: { type: String,  },
  lastName: { type: String,  },
  profilePicture: { type: String,  }, // Cloudinary URL
  dateOfBirth: { type: Date,  },
  gender: { type: String , enum: ['male', 'female', 'other'] },
  interests: [{ type: String }],
  contactsFiltered: [{ type: String }], // Filtered contact emails or IDs
  notificationsEnabled: { type: Boolean, default: false },
  uniqueNumber: { type: String, unique: true },
  verificationCode: { type: String },
  verificationCodeExpires: { type: Date },
});

const User = mongoose.model('User', userSchema);

export default User;
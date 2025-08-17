// Update to models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePicture: { type: String, required: true }, // Cloudinary URL
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  interests: [{ type: String }],
  contactsFiltered: [{ type: String }], // Filtered contact emails or IDs
  notificationsEnabled: { type: Boolean, default: false },
  uniqueNumber: { type: String, unique: true },
  verificationCode: { type: String },
  verificationCodeExpires: { type: Date },
});

const User = mongoose.model('User', userSchema);

export default User;
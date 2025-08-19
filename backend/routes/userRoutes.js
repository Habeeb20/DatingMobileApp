import express from 'express';
import { sendVerificationCode } from '../config/email.js';
import User from '../models/userSchema.js';
import  { validateEmail, validateCode, validatePhone, validateProfile, validatePassword }  from '../middlewares/validation.js';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

const router = express.Router();

// Step 1: Submit Email
router.post('/email', validateEmail, async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already registered' });

    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user = new User({ email, verificationCode, verificationCodeExpires });
    await user.save();

    await sendVerificationCode(email, verificationCode);
    res.status(200).json({ message: 'Verification code sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Step 2: Verify Code
router.post('/verify', validateCode, async (req, res) => {
  const { email, code } = req.body;
  console.log(req.body, "your body")
  try {
    const user = await User.findOne({ email });
    console.log(user?.email)
    if (!user) return res.status(400).json({ message: 'User not found' });

    if (user.verificationCode !== code || user.verificationCodeExpires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();
    res.status(200).json({ message: 'Code verified', nextStep: 'phone' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Step 3: Submit Phone Number
router.post('/phone', validatePhone, async (req, res) => {
  const { email, phoneNumber } = req.body;
  console.log(req.body)
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    user.phoneNumber = phoneNumber;
    await user.save();
    res.status(200).json({ message: 'Phone number saved', nextStep: 'profile' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



// Step 5: Submit Interests
router.post('/interests', async (req, res) => {
  const { email, interests } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    user.interests = interests;
    await user.save();
    res.status(200).json({ message: 'Interests saved', nextStep: 'contacts' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Step 6: Submit Contacts
router.post('/contacts', async (req, res) => {
  const { email, contactsFiltered } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    user.contactsFiltered = contactsFiltered;
    await user.save();
    res.status(200).json({ message: 'Contacts saved', nextStep: 'notifications' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


router.post('/profile', validateProfile, async (req, res) => {
  
  const { email, firstName, lastName, profilePicture, dateOfBirth,  password } = req.body;
  console.log(req.body)
  try {
    const user = await User.findOne({ email });
    console.log("email not found")
    if (!user) return res.status(400).json({ message: 'User not found' });



    user.firstName = firstName;
    user.lastName = lastName;
    user.profilePicture = profilePicture;
    user.dateOfBirth = new Date(dateOfBirth);
  
    user.password = password
    await user.save();
    res.status(200).json({ message: 'Profile and password saved', nextStep: 'gender' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


router.post('/gender', async(req, res) => {
  const {email, gender} = req.body;
  console.log(req.body)
  try {
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message: "email doesnt exist or not found"})


    user.gender = gender
    await user.save()
      res.status(200).json({ message: 'Phone number saved', nextStep: 'interests' });
  } catch (error) {
    console.log(error)
      res.status(500).json({ message: 'Server error', error: error.message });
  }
})


// ... Keep interests, contacts as is

// Step 7: Toggle Notifications and Generate Unique Number
router.post('/notifications', async (req, res) => {
  const { email, notificationsEnabled } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    user.notificationsEnabled = notificationsEnabled;

    let uniqueNumber;
    let isUnique = false;
    while (!isUnique) {
      uniqueNumber = crypto.randomInt(100000, 1000000).toString(); // 6-digit number
      const existingUser = await User.findOne({ uniqueNumber });
      if (!existingUser) isUnique = true;
    }

    user.uniqueNumber = uniqueNumber;
    await user.save();

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ message: 'Onboarding complete', token, uniqueNumber: user.uniqueNumber });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// New Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
export default router;
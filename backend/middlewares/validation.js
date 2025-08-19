export const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email' });
  next();
};

export const validateCode = (req, res, next) => {
  const { code } = req.body;
  if (!/^\d{4}$/.test(code)) return res.status(400).json({ message: 'Invalid 4-digit code' });
  next();
};

export const validatePhone = (req, res, next) => {
  const { phoneNumber } = req.body;
  const phoneRegex = /^\+[1-9]\d{1,14}$/; // E.164 format
  if (!phoneRegex.test(phoneNumber)) return res.status(400).json({ message: 'Invalid phone number' });
  next();
};

export const validateProfile = (req, res, next) => {
  const { firstName, lastName, profilePicture, dateOfBirth } = req.body;
  if (!firstName || !lastName || !profilePicture || !dateOfBirth ) {
    return res.status(400).json({ message: 'All profile fields are required' });
  }
  next();
};



export const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });
  next();
};


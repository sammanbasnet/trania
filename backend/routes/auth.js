import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Trainer from '../models/Trainer.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Generate JWT token
const generateToken = (userId, userType) => {
  return jwt.sign({ userId, userType }, JWT_SECRET, { expiresIn: '7d' });
};

// User Signup
router.post('/user/signup', async (req, res) => {
  try {
    const { fullName, email, phone, password, gender } = req.body;

    // Validation
    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ 
        error: 'Please fill in all required fields' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        error: 'User with this email already exists' 
      });
    }

    // Create new user
    const userData = {
      fullName,
      email,
      phone,
      password,
      userType: 'client',
    };

    // Only add gender if it's provided and valid
    if (gender && ['male', 'female', 'other'].includes(gender)) {
      userData.gender = gender;
    }

    const user = new User(userData);
    await user.save();

    // Generate token
    const token = generateToken(user._id.toString(), 'client');

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.error('User signup error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: 'User with this email already exists' 
      });
    }
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        error: errors.join(', ') 
      });
    }
    
    // Return more detailed error in development
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? error.message || 'Server error. Please try again later.'
      : 'Server error. Please try again later.';
    
    res.status(500).json({ 
      error: errorMessage 
    });
  }
});

// User Login
router.post('/user/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Please enter email and password' 
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    // Generate token
    const token = generateToken(user._id.toString(), 'client');

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.error('User login error:', error);
    res.status(500).json({ 
      error: 'Server error. Please try again later.' 
    });
  }
});

// Trainer Signup
router.post('/trainer/signup', async (req, res) => {
  try {
    const { 
      fullName, 
      email, 
      phone, 
      password, 
      yearsExperience, 
      hourlyRate, 
      certifications, 
      specialties, 
      gymLocation 
    } = req.body;

    // Validation
    if (!fullName || !email || !phone || !password || !yearsExperience || !hourlyRate) {
      return res.status(400).json({ 
        error: 'Please fill in all required fields' 
      });
    }

    // Check if trainer already exists
    const existingTrainer = await Trainer.findOne({ email });
    if (existingTrainer) {
      return res.status(400).json({ 
        error: 'Trainer with this email already exists' 
      });
    }

    // Create new trainer
    const trainer = new Trainer({
      fullName,
      email,
      phone,
      password,
      yearsExperience,
      hourlyRate: Number(hourlyRate),
      certifications: certifications || '',
      specialties: specialties || [],
      gymLocation: gymLocation || '',
      userType: 'trainer',
    });

    await trainer.save();

    // Generate token
    const token = generateToken(trainer._id.toString(), 'trainer');

    res.status(201).json({
      message: 'Trainer registered successfully',
      token,
      trainer: {
        id: trainer._id.toString(),
        fullName: trainer.fullName,
        email: trainer.email,
        phone: trainer.phone,
        userType: trainer.userType,
      },
    });
  } catch (error) {
    console.error('Trainer signup error:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: 'Trainer with this email already exists' 
      });
    }
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        error: errors.join(', ') 
      });
    }
    
    res.status(500).json({ 
      error: error.message || 'Server error. Please try again later.' 
    });
  }
});

// Trainer Login
router.post('/trainer/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Please enter email and password' 
      });
    }

    // Find trainer
    const trainer = await Trainer.findOne({ email });
    if (!trainer) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    // Check password
    const isPasswordValid = await trainer.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    // Generate token
    const token = generateToken(trainer._id.toString(), 'trainer');

    res.json({
      message: 'Login successful',
      token,
      trainer: {
        id: trainer._id.toString(),
        fullName: trainer.fullName,
        email: trainer.email,
        phone: trainer.phone,
        userType: trainer.userType,
      },
    });
  } catch (error) {
    console.error('Trainer login error:', error);
    res.status(500).json({ 
      error: 'Server error. Please try again later.' 
    });
  }
});

// Universal login (checks both User and Trainer)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Please enter email and password' 
      });
    }

    // Try to find as trainer first
    let trainer = await Trainer.findOne({ email });
    if (trainer) {
      const isPasswordValid = await trainer.comparePassword(password);
      if (isPasswordValid) {
        const token = generateToken(trainer._id.toString(), 'trainer');
        return res.json({
          message: 'Login successful',
          token,
          user: {
            id: trainer._id.toString(),
            fullName: trainer.fullName,
            email: trainer.email,
            phone: trainer.phone,
            userType: 'trainer',
          },
        });
      }
    }

    // Try to find as user
    let user = await User.findOne({ email });
    if (user) {
      const isPasswordValid = await user.comparePassword(password);
      if (isPasswordValid) {
        const token = generateToken(user._id.toString(), 'client');
        return res.json({
          message: 'Login successful',
          token,
          user: {
            id: user._id.toString(),
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            userType: 'client',
          },
        });
      }
    }

    // If neither found or password invalid
    return res.status(401).json({ 
      error: 'Invalid email or password' 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Server error. Please try again later.' 
    });
  }
});

export default router;


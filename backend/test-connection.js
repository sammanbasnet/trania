// Simple script to test MongoDB connection
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/trania';

console.log('Testing MongoDB connection...');
console.log('Connection string:', MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connection successful!');
    console.log('Database:', mongoose.connection.name);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed!');
    console.error('Error:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('1. Make sure MongoDB is installed and running');
    console.error('2. Check if MongoDB service is started');
    console.error('3. Verify the connection string is correct');
    process.exit(1);
  });


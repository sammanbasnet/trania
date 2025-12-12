# Quick Setup Guide

## Prerequisites
1. **Node.js** installed (v16 or higher)
2. **MongoDB** installed and running

## Step 1: Install Dependencies
```bash
cd backend
npm install
```

## Step 2: Start MongoDB
Make sure MongoDB is running:
- **Windows**: MongoDB should be running as a service, or start it manually
- **Mac/Linux**: Run `mongod` in a terminal
- **MongoDB Atlas**: Use your connection string in `.env` file

## Step 3: Create .env File
Create a `.env` file in the `backend` folder:
```
MONGODB_URI=mongodb://localhost:27017/trania
JWT_SECRET=your-secret-key-change-in-production
PORT=5000
```

## Step 4: Start the Backend Server
```bash
# Development mode (auto-restart on changes)
npm run dev

# OR Production mode
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

## Step 5: Test the API
Open your browser and go to:
```
http://localhost:5000/api/health
```

You should see: `{"status":"OK","message":"TRANIA API is running"}`

## Troubleshooting

### Error: "Cannot connect to server"
- Make sure the backend server is running on port 5000
- Check if MongoDB is running
- Verify the MongoDB connection string in `.env`

### Error: "MongoDB connection error"
- Make sure MongoDB is installed and running
- Check if the connection string is correct
- For MongoDB Atlas, make sure your IP is whitelisted

### Error: "Port 5000 already in use"
- Change the PORT in `.env` file
- Or stop the process using port 5000


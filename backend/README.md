# TRANIA Backend API

Backend server for the TRANIA trainer booking system using Node.js, Express, and MongoDB.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Update the MongoDB connection string if needed
   - Update the JWT secret key for production

3. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Default connection: `mongodb://localhost:27017/trania`
   - Or use MongoDB Atlas connection string

4. **Run the Server**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

   The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/user/signup` - User (client) registration
- `POST /api/auth/user/login` - User (client) login
- `POST /api/auth/trainer/signup` - Trainer registration
- `POST /api/auth/trainer/login` - Trainer login
- `POST /api/auth/login` - Universal login (checks both user and trainer)

### Health Check

- `GET /api/health` - Server health check

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)

## Frontend Configuration

Update your frontend `.env` file (or `vite.config.mts`) to include:
```
VITE_API_URL=http://localhost:5000/api
```


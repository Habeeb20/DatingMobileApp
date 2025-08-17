import express from 'express';
import authRoutes from "./routes/userRoutes.js"
import connectDB from './config/db.js';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (res, req) => {
  res.send("app is running")
} )
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
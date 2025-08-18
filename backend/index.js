import express from 'express';
import authRoutes from "./routes/userRoutes.js"
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import cors from "cors"
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:8081', 
  methods: ['GET', 'POST', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(express.json());
app.use(morgan('dev'));
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
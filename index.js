import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database.js';
import bookRoutes from './routes/book.route.js';
import cors from 'cors';
import userRoutes from './routes/user.route.js';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors())

// Connect to database
connectDB();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/book', bookRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

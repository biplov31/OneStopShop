import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';
import salesRoutes from './routes/sales.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://127.0.0.1:5173'}));
app.use(cookieParser());

// user registration and login
app.use('/', authRoutes);

// create, update, retrieve and delete products
app.use('/product', productRoutes);

// create, update, retrieve and delete orders
app.use('/order', orderRoutes);

// generate daily, weekly and monthly sales reports along with finding top-selling products
app.use('/report', salesRoutes)

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
})
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectdb from './config/mongodb.js'
import { connectcloudinary } from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import { cloudinary } from './config/cloudinary.js';
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'



//app config
const app = express()
const port = process.env.PORT || 4000
const connectDBWithRetry = async () => {
  try {
    await connectdb();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};
connectDBWithRetry();

try {
  connectcloudinary();
} catch (error) {
  console.error("Cloudinary connection failed:", error.message);
}

//middilware
app.use(express.json())
app.use(cors())

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.get('/', (req, res) => {
  res.send("API is working")
})
app.get('/favicon.png', (req, res) => res.status(204).end());
app.get('/favicon.ico', (req, res) => res.status(204).end());

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => console.log(`Server is running on port ${port}`));
}

export default app;
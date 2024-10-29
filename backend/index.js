import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './productRoutes.js'; // Import các route sản phẩm

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối tới MongoDB cục bộ (localhost)
const mongoURI = 'mongodb://localhost:27017/books_database'; // Thay 'books_database' bằng tên DB của bạn

// Kết nối đến MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to MongoDB on localhost'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Route mẫu
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Sử dụng các route sản phẩm
app.use('/api/products', productRoutes); // Chú ý: sử dụng chữ thường cho "products"

const PORT = process.env.PORT || 5000; // Sử dụng PORT từ biến môi trường nếu có
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

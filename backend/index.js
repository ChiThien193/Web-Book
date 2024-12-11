import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import orderRoutes from "./orderRoutes.js"; // Import routes đơn hàng
import productRoutes from './productRoutes.js'; // Import các route sản phẩm


const app = express();
app.use(cors());
app.use(express.json());

// Kết nối tới MongoDB cục bộ (localhost)
mongoose.connect("mongodb://localhost:27017/books_database", {
})
  .then(() => {
    console.log("Kết nối MongoDB thành công");
  })
  .catch((error) => {
    console.error("Không thể kết nối MongoDB:", error.message);
  });

// Route kiểm tra
app.get("/", (req, res) => {
  res.send("Server is running on http://localhost:5000");
});

// Sử dụng các route sản phẩm lên trang chủ
app.use('/api', productRoutes);

// Sử dụng các route đơn hàng lên orders (lưu thông tin người mua lên data mongodb)
app.use("/api", orderRoutes);

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

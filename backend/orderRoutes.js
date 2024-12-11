import express from "express";
import Order from "./orderModel.js";

const router = express.Router();

// Route lưu thông tin đơn hàng
router.post("/orders", async (req, res) => {
  try {
    const { name, email, phone, country, province, district, ward, address, paymentMethod, cartItems, total } = req.body;

    // Kiểm tra xem thông tin đã đầy đủ chưa
    if (!name || !email || !phone || !province || !district || !ward || !address || !paymentMethod || !cartItems || !total) {
      return res.status(400).json({ error: "Vui lòng điền đầy đủ thông tin." });
    }

    // Lưu đơn hàng vào MongoDB
    const newOrder = new Order({ name, email, phone, country, province, district, ward, address, paymentMethod, cartItems, total });
    const savedOrder = await newOrder.save();

    // Trả về phản hồi thành công
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Lỗi khi lưu đơn hàng." });
  }
});

export default router;

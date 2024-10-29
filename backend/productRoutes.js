// productRoutes.js
import express from 'express';
import Product from './productModel.js'; // Import mô hình sản phẩm

const router = express.Router();

// Lấy tất cả sản phẩm
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tìm kiếm sản phẩm theo tên hoặc tác giả
router.get('/search', async (req, res) => {
  try {
    const { term = '', searchBy = 'title' } = req.query;

    // Kiểm tra điều kiện tìm kiếm
    if (!term) {
      return res.status(400).json({ message: 'Search term is required' });
    }

    let query = {};
    
    // Tạo truy vấn tìm kiếm
    if (searchBy === "title") {
      query.title = { $regex: term, $options: 'i' }; // Tìm theo tên
    } else if (searchBy === "author") {
      query.author = { $regex: term, $options: 'i' }; // Tìm theo tác giả
    } else {
      return res.status(400).json({ message: 'Invalid searchBy parameter' });
    }

    // Lấy danh sách sản phẩm dựa trên truy vấn
    const products = await Product.find(query);
    
    // Kiểm tra xem có sản phẩm nào không
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

import express from 'express';
import mongoose from 'mongoose';
import Product from './Product.js';

const router = express.Router();


// Lấy chi tiết sản phẩm theo ID
router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID sản phẩm không hợp lệ' });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    res.json(product);
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết sản phẩm:', error.message);
    res.status(500).json({ message: 'Lỗi khi lấy chi tiết sản phẩm' });
  }
});

//Tìm kiếm
router.get('/search', async (req, res) => {
  try {
    const { term = '', searchBy = 'title' } = req.query;

    if (!term) {
      return res.status(400).json({ message: 'Cần cung cấp từ khóa tìm kiếm' });
    }

    let query = {};
    if (searchBy === 'title') {
      query.title = { $regex: term, $options: 'i' }; // Tìm kiếm không phân biệt hoa thường
    } else if (searchBy === 'author') {
      query.author = { $regex: term, $options: 'i' };
    } else if (searchBy === 'genre') {
      query.genre = { $regex: term, $options: 'i' };
    } else {
      return res.status(400).json({ message: 'Tham số tìm kiếm không hợp lệ' });
    }

    // Thêm console log để kiểm tra truy vấn
    console.log('Truy vấn tìm kiếm:', query);

    const products = await Product.find(query);

    // Thêm console log để kiểm tra kết quả tìm kiếm
    console.log('Kết quả tìm kiếm:', products);

    if (products.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm nào' });
    }

    res.json(products);
  } catch (error) {
    console.error('Lỗi khi tìm kiếm sản phẩm:', error.message);
    res.status(500).json({ message: 'Lỗi khi tìm kiếm sản phẩm' });
  }
});

// Thêm sản phẩm mới
router.post('/products', async (req, res) => {
  try {
    const productData = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!productData.title || !productData.price || !productData.author) {
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin sản phẩm' });
    }

    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();

    res.status(201).json({ message: 'Thêm sản phẩm thành công', product: savedProduct });
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm:', error.message);
    res.status(500).json({ message: 'Không thể thêm sản phẩm' });
  }
});

// Cập nhật sản phẩm
router.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID sản phẩm không hợp lệ' });
    }

    // Kiểm tra sản phẩm tồn tại
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    // Cập nhật sản phẩm
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    res.json({ message: 'Cập nhật sản phẩm thành công', product: updatedProduct });
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error.message);
    res.status(500).json({ message: 'Không thể cập nhật sản phẩm' });
  }
});

// Lấy tất cả sản phẩm
router.get('/products', async (req, res) => {
  try {
    // Lấy tất cả sản phẩm từ database
    const products = await Product.find();

    if (products.length === 0) {
      return res.status(404).json({ message: 'Không có sản phẩm nào trong cơ sở dữ liệu' });
    }

    res.json(products);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error.message);
    res.status(500).json({ message: 'Không thể lấy danh sách sản phẩm' });
  }
});

// Xóa sản phẩm
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID sản phẩm không hợp lệ' });
    }

    // Kiểm tra sản phẩm tồn tại
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    // Xóa sản phẩm
    await Product.findByIdAndDelete(id);

    res.json({ message: 'Xóa sản phẩm thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error.message);
    res.status(500).json({ message: 'Không thể xóa sản phẩm' });
  }
});

export default router;
"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import "./ProductManagement.css";

interface Product {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  supplier: string;
  publicationYear: number;
  format: string;
  image: string;
}

export default function ProductManagement() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [productForm, setProductForm] = useState<Product>({
    title: "",
    author: "",
    genre: "",
    price: 0,
    supplier: "",
    publicationYear: new Date().getFullYear(),
    format: "",
    image: "",
  });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const productsPerPage = 8;

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch {
      setError("Không thể tải danh sách sản phẩm");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (editingProductId) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/products/${editingProductId}`,
          productForm
        );
        alert("Cập nhật sản phẩm thành công");
        setMessage((response.data as { message: string }).message);
        setEditingProductId(null);
        setProductForm({
          title: "",
          author: "",
          genre: "",
          price: 0,
          supplier: "",
          publicationYear: new Date().getFullYear(),
          format: "",
          image: "",
        });
        fetchProducts();
      } catch {
        alert("Cập nhật sản phẩm thất bại");
        setError("Lỗi khi cập nhật sản phẩm");
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/products",
          productForm
        );
        alert("Thêm sản phẩm thành công");
        setMessage((response.data as { message: string }).message);
        setProductForm({
          title: "",
          author: "",
          genre: "",
          price: 0,
          supplier: "",
          publicationYear: new Date().getFullYear(),
          format: "",
          image: "",
        });
        fetchProducts();
      } catch {
        alert("Thêm sản phẩm thất bại");
        setError("Lỗi khi thêm sản phẩm");
      }
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProductId(product._id || null);
    setProductForm(product);
  };

  const handleDelete = async (productId: string) => {
    const confirmDelete = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      alert("Xóa sản phẩm thành công");
      setMessage("Xóa sản phẩm thành công");
      fetchProducts();
    } catch {
      alert("Xóa sản phẩm thất bại");
      setError("Lỗi khi xóa sản phẩm");
    }
  };

  const resetForm = () => {
    setEditingProductId(null);
    setProductForm({
      title: "",
      author: "",
      genre: "",
      price: 0,
      supplier: "",
      publicationYear: new Date().getFullYear(),
      format: "",
      image: "",
    });
  };

  // Calculate products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="container">
      <div className="header">
        <h1>Quản lý sản phẩm</h1>
        <button className="home-button" onClick={() => router.push("/")}>
          Quay về trang chủ
        </button>
      </div>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}

      <div className="form-container">
        <h2>{editingProductId ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Tên sản phẩm"
            value={productForm.title}
            onChange={handleInputChange}
            required
          />
          <input
            name="author"
            placeholder="Tác giả"
            value={productForm.author}
            onChange={handleInputChange}
            required
          />
          <input
            name="genre"
            placeholder="Thể loại"
            value={productForm.genre}
            onChange={handleInputChange}
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Giá"
            value={productForm.price}
            onChange={handleInputChange}
            required
          />
          <div className="form-actions">
            <button type="submit">{editingProductId ? "Cập nhật" : "Thêm sản phẩm"}</button>
            {editingProductId && (
              <button type="button" onClick={resetForm}>
                Hủy
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="product-grid">
        {currentProducts.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={product.image} alt={product.title} className="product-image" />
            <h3>{product.title}</h3>
            <p>Tác giả: {product.author}</p>
            <p>Thể loại: {product.genre}</p>
            <p>Giá: {product.price} VND</p>
            <div className="actions">
              <button onClick={() => handleEdit(product)}>Sửa</button>
              <button onClick={() => handleDelete(product._id!)} className="delete-button">
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active-page" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

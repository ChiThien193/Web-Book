"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Header from "../../components/Header";
import "./product-details.css";

interface Product {
  _id: string;
  title: string;
  price: number;
  image: string;
  author: string;
  genre: string;
  publisher?: string;
  coverType?: string;
}

export default function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Trạng thái điều khiển pop-up
  const { id } = useParams();
  const router = useRouter();

  const handleSearch = (searchTerm: string, searchBy: string) => {
    console.log("Tìm kiếm:", searchTerm, "Tìm theo:", searchBy);
  };

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Product>(
          `http://localhost:5000/api/products/${id}`
        );
        if (response.data) {
          setProduct(response.data);
        } else {
          setProduct(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Đang tải thông tin sản phẩm...</p>;
  }

  if (!product) {
    return <p>Không tìm thấy sản phẩm</p>;
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: Product) => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setShowPopup(true); // Hiển thị pop-up thông báo
    setTimeout(() => setShowPopup(false), 2000); // Ẩn pop-up sau 2 giây
  };

  const buyNow = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: Product) => item._id === product._id);

    if (!existingItem) {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/books/gio_hang"); // Chuyển đến trang giỏ hàng
  };

  return (
    <div className="product-details-page">
      <Header onSearch={handleSearch} />

      {/* Pop-up thông báo */}
      {showPopup && (
        <div className="popup">
          <p>Sản phẩm đã được thêm vào giỏ hàng!</p>
        </div>
      )}

      <div className="product-details">
        {/* Hình ảnh sản phẩm */}
        <div className="product-image">
          <Image src={product.image} alt={product.title} width={400} height={600} />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="product-info">
          <h1>{product.title}</h1>
          <p>
            <strong>Nhà cung cấp:</strong> {product.publisher || "Không rõ"}
          </p>
          <p>
            <strong>Tác giả:</strong> {product.author}
          </p>
          <p>
            <strong>Hình thức:</strong> {product.coverType || "Không rõ"}
          </p>
          <h2>{product.price.toLocaleString()} đ</h2>

          {/* Nút thao tác */}
          <div className="product-actions">
            <button className="btn-primary" onClick={addToCart}>
              Thêm vào giỏ hàng
            </button>
            <button className="btn-secondary" onClick={buyNow}>
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Thông tin vận chuyển */}
      <div className="shipping-info">
        <h3>Thông tin vận chuyển</h3>
        <p>
          Giao hàng đến: {" "}
          <span className="shipping-address">
            Phường Bến Nghé, Quận 1, Hồ Chí Minh
          </span>{" "}
          <a href="#" className="change-link">
            Thay đổi
          </a>
        </p>
        <div className="quantity-control">
          <span>Số Lượng: </span>
          <button>-</button>
          <input type="number" value={1} readOnly />
          <button>+</button>
        </div>
      </div>
      {/* Gợi ý sản phẩm */}
      <div className="suggested-products">
        <h3>Một số sách thú vị bạn nên biết:</h3>
        <div className="product-list">
          <div className="product-item">
            <Image src="https://cdn0.fahasa.com/media/catalog/product/8/9/8935235237773.jpg" alt="Book 1" width={150} height={200} />
            <p>Người đua diều</p>
            <p>126.400 đ - <span className="discount">20%</span></p>
          </div>
          <div className="product-item">
            <Image src="https://cdn0.fahasa.com/media/catalog/product/8/9/8935236433587.jpg" alt="Book 2" width={150} height={200} />
            <p>Sổ Tay Ngữ Pháp Tiếng Anh</p>
            <p>60.000 đ - <span className="discount">20%</span></p>
          </div>
          <div className="product-item">
            <Image src="https://cdn0.fahasa.com/media/catalog/product/z/4/z4118763446785_cf4bc22d353b065bbb37e686de1f9207.jpg" alt="Book 3" width={150} height={200} />
            <p>Hiểu Về Trái Tim</p>
            <p>126.000 đ - <span className="discount">20%</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
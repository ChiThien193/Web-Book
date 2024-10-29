"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaBell, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import Slider from "react-slick";
import axios from "axios";

interface Product {
  _id: string;
  title: string;
  price: number;
  image: string;
  author?: string; // Nếu bạn muốn tìm kiếm theo tác giả
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Hàm tìm kiếm sản phẩm
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get<Product[]>(
        `http://localhost:5000/api/products/search`, // Endpoint tìm kiếm
        {
          params: {
            term: searchTerm,
            searchBy: searchBy,
          },
        }
      );

      // Đảm bảo dữ liệu có kiểu Product[]
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error("Dữ liệu không phải là mảng sản phẩm");
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Hàm để lấy tất cả sản phẩm khi component được mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:5000/api/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="container">
      {/* header */}
      <header className="header">
        <Image src="/books/logo.webp" alt="logo" width={250} height={50} />
        {/* Tìm kiếm */}
        <form onSubmit={handleSearch} className="search-bar">
          <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            className="search-select"
          >
            <option value="title">Sách giáo khoa</option>
            <option value="author">Tiểu thuyết</option>
            <option value="genre">Truyện tranh</option>
            <option value="keyword">Văn phòng phẩm</option>
          </select>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Tìm kiếm
          </button>
        </form>
        <div className="header-icons">
          <FaBell className="header-icon" />
          <FaShoppingCart className="header-icon" />
          <FaUserCircle className="header-icon" />
        </div>
      </header>

      {/*Banner lưu động */}
      <div className="carousel-container mb-8">
        <Slider {...settings}>
          <div className="slide">
            <Image
              src="/qc/qc1.jpg"
              alt="Banner 1"
              layout="intrinsic"
              width={1200}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="slide">
            <Image
              src="/qc/qc2.jpg"
              alt="Banner 2"
              layout="intrinsic"
              width={1200}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="slide">
            <Image
              src="/qc/qc3.jpg"
              alt="Banner 3"
              layout="intrinsic"
              width={1200}
              height={400}
              className="rounded-lg"
            />
          </div>
        </Slider>
      </div>

      <h4>Tủ sách</h4>
      {/* Danh sách các sách */}
      <div className="book-list">
        {loading ? (
          <p>Đang tải sản phẩm...</p>
        ) : (
          products.map((product) => (
            <div className="book-item" key={product._id}>
              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={750}
              />
              <h3>{product.title}</h3>
              <p>{product.price} đ</p>
            </div>
          ))
        )}
      </div>

      <h4>Văn phòng phẩm nổi bật</h4>
      <div className="Items-list">
        {/* Có thể thêm các sản phẩm văn phòng phẩm từ backend tương tự như phần trên */}
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-col">
            <Image
              src="/books/logo.webp"
              alt="logo"
              width={50}
              height={100}
              className="footer-logo"
            />
            <p>Lầu 5, 387-389 Hai Bà Trưng, Quận 3, TP HCM</p>
            <p>
              Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA
            </p>
            <p>
              60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam
            </p>
            <p>
              Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua và nhận
              hàng trực tiếp tại văn phòng cũng như tất cả Hệ Thống Fahasa trên toàn quốc.
            </p>
          </div>
          {/* Cột dịch vụ */}
          <div className="footer-col">
            <h4>DỊCH VỤ</h4>
            <ul>
              <li>Điều khoản sử dụng</li>
              <li>Chính sách bảo mật thông tin cá nhân</li>
              <li>Chính sách bảo mật thanh toán</li>
              <li>Giới thiệu Fahasa</li>
              <li>Hệ thống trung tâm - nhà sách</li>
            </ul>
          </div>
          {/* Cột hỗ trợ */}
          <div className="footer-col">
            <h4>HỖ TRỢ</h4>
            <ul>
              <li>Chính sách đổi - trả - hoàn tiền</li>
              <li>Chính sách bảo hành - bồi hoàn</li>
              <li>Chính sách vận chuyển</li>
              <li>Chính sách khách sỉ</li>
            </ul>
          </div>
          {/* Cột tài khoản */}
          <div className="footer-col">
            <h4>TÀI KHOẢN CỦA TÔI</h4>
            <ul>
              <li>Đăng nhập/ Tạo mới tài khoản</li>
              <li>Thay đổi địa chỉ khách hàng</li>
              <li>Chi tiết tài khoản</li>
              <li>Lịch sử mua hàng</li>
            </ul>
          </div>
          {/* Cột liên hệ */}
          <div className="footer-col">
            <h4>LIÊN HỆ</h4>
            <p>60-62 Lê Lợi, Q.1, TP. HCM</p>
            <p>Email: cskh@fahasa.com.vn</p>
            <p>Hotline: 1900636467</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

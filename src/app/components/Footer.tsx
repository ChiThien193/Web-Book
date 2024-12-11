"use client";
import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo và giới thiệu */}
        <div className="footer-col">
          <Image
            src="/books/logo.webp"
            alt="logo"
            width={100}
            height={50}
            className="footer-logo"
          />
          <p className="footer-description">
            Lầu 5, 387-389 Hai Bà Trưng, Quận 3, TP HCM
          </p>
          <p className="footer-description">
            Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA
          </p>
          <p className="footer-description">
            Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ
            trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả hệ
            thống nhà sách.
          </p>
        </div>

        {/* Dịch vụ */}
        <div className="footer-col">
          <h4>DỊCH VỤ</h4>
          <ul>
            <li>
              <a href="#">Điều khoản sử dụng</a>
            </li>
            <li>
              <a href="#">Chính sách bảo mật</a>
            </li>
            <li>
              <a href="#">Chính sách thanh toán</a>
            </li>
            <li>
              <a href="#">Giới thiệu Fahasa</a>
            </li>
            <li>
              <a href="#">Hệ thống nhà sách</a>
            </li>
          </ul>
        </div>

        {/* Hỗ trợ */}
        <div className="footer-col">
          <h4>HỖ TRỢ</h4>
          <ul>
            <li>
              <a href="#">Chính sách đổi trả</a>
            </li>
            <li>
              <a href="#">Chính sách bảo hành</a>
            </li>
            <li>
              <a href="#">Chính sách vận chuyển</a>
            </li>
            <li>
              <a href="#">Chính sách khách sỉ</a>
            </li>
          </ul>
        </div>

        {/* Tài khoản */}
        <div className="footer-col">
          <h4>TÀI KHOẢN CỦA TÔI</h4>
          <ul>
            <li>
              <a href="#">Đăng nhập / Tạo tài khoản</a>
            </li>
            <li>
              <a href="#">Thay đổi địa chỉ</a>
            </li>
            <li>
              <a href="#">Chi tiết tài khoản</a>
            </li>
            <li>
              <a href="#">Lịch sử mua hàng</a>
            </li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div className="footer-col">
          <h4>LIÊN HỆ</h4>
          <p>Email: <a href="mailto:cskh@fahasa.com.vn">cskh@fahasa.com.vn</a></p>
          <p>Hotline: <a href="tel:1900636467">1900636467</a></p>
          <p>Địa chỉ: 60-62 Lê Lợi, Q.1, TP.HCM</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Fahasa. All rights reserved.</p>
      </div>
      <style jsx>{`
      /* Footer container */
.footer {
  background-color: #f8f9fa;
  padding: 40px 20px;
  color: #333;
  font-family: Arial, sans-serif;
  border-top: 1px solid #e1e1e1;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Footer columns */
.footer-col {
  flex: 1;
  min-width: 200px;
}

.footer-col h4 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #007bff;
  text-transform: uppercase;
}

.footer-col ul {
  list-style: none;
  padding: 0;
}

.footer-col ul li {
  margin-bottom: 10px;
}

.footer-col ul li a {
  text-decoration: none;
  color: #555;
  transition: color 0.3s;
}

.footer-col ul li a:hover {
  color: #007bff;
}

.footer-description {
  margin-bottom: 15px;
  font-size: 14px;
  color: #777;
  line-height: 1.6;
}

/* Logo */
.footer-logo {
  margin-bottom: 15px;
  width: auto;
  height: auto;
}

/* Footer bottom */
.footer-bottom {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #777;
}

.footer-bottom a {
  color: #007bff;
  text-decoration: none;
}

.footer-bottom a:hover {
  text-decoration: underline;
}

      
      `}</style>
    </footer>
  );
}

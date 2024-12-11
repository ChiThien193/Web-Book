"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaBell, FaShoppingCart, FaUserCircle } from "react-icons/fa";

interface HeaderProps {
  onSearch: (searchTerm: string, searchBy: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm, searchBy);
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <div className="logo-container">
          <Image src="/books/logo.webp" alt="logo" width={150} height={40} />
        </div>

        {/* Tìm kiếm */}
        <form onSubmit={handleSubmit} className="search-bar">
          <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            className="search-select"
          >
            <option value="title">Tên sách</option>
            <option value="author">Tác giả</option>
            <option value="genre">Thể loại</option>
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

        {/* Icon chức năng */}
        <div className="header-icons">
          <FaBell className="header-icon" title="Thông báo" />
          <FaShoppingCart
            className="header-icon"
            title="Giỏ hàng"
            onClick={() => router.push("/books/gio_hang")}
          />
          <FaUserCircle className="header-icon" title="Tài khoản" 
            onClick={() => router.push("/books/quanli")}
          />
        </div>
      </div>
      <style jsx>{`
      /* Tổng quan */
.header {
  background-color: #f8f9fa; /* Màu nền sáng */
  border-bottom: 1px solid #e1e1e1; /* Đường viền dưới */
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Bóng mờ */
}

/* Header sẽ di chuyển khi cuộn, không cần thêm position: sticky */
.header-content {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo */
.logo-container img {
  cursor: pointer;
}

/* Thanh tìm kiếm */
.search-bar {
  display: flex;
  flex: 1;
  max-width: 600px;
  margin: 0 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  background-color: white;
}

.search-select {
  padding: 10px;
  border: none;
  background-color: #f1f1f1;
  font-size: 14px;
  cursor: pointer;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: none;
  font-size: 14px;
}

.search-input:focus {
  outline: none;
}

.search-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

.search-btn:hover {
  background-color: #0056b3;
}

/* Icon chức năng */
.header-icons {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-icon {
  font-size: 20px;
  color: #495057;
  cursor: pointer;
  transition: color 0.3s;
}

.header-icon:hover {
  color: #007bff;
}


      `}</style>
    </header>
    
  );
}

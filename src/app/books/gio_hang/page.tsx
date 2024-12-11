"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  isSelected: boolean;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]").map((item: CartItem) => ({
      ...item,
      isSelected: false,
    }));
    setCartItems(cart);
  }, []);

  const updateQuantity = (id: string, action: "increase" | "decrease") => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === id) {
        const newQuantity =
          action === "increase" ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(newQuantity, 1) };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const toggleSelect = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, isSelected: !item.isSelected } : item
    );
    setCartItems(updatedCart);
  };

  const toggleSelectAll = () => {
    const allSelected = cartItems.every((item) => item.isSelected);
    const updatedCart = cartItems.map((item) => ({ ...item, isSelected: !allSelected }));
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems
      .filter((item) => item.isSelected)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const goToCheckout = () => {
    const selectedItems = cartItems.filter((item) => item.isSelected);
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
      return;
    }
    localStorage.setItem("checkoutItems", JSON.stringify(selectedItems));
    router.push("/books/thanh_toan");
  };

  const handleSearch = (searchTerm: string, searchBy: string) => {
    console.log("Search term:", searchTerm, "Search by:", searchBy);
  };

  return (
    <div className="cart-page">
      <Header onSearch={handleSearch} />
      <h1>Giỏ Hàng</h1>
      <h3>Số lượng sản phẩm trong giỏ: {calculateTotalItems()}</h3>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <img
            src="/qc/image.png"
            alt="Giỏ hàng trống"
            className="empty-cart-image"
          />
          <p>Giỏ hàng của bạn đang trống.</p>
          <button
            className="btn-shop-now"
            onClick={() => router.push("/")}
          >
            Mua sắm ngay
          </button>
        </div>
      ) : (
        <div className="cart-items">
          <button onClick={toggleSelectAll} className="btn-select-all">
            {cartItems.every((item) => item.isSelected)
              ? "Bỏ chọn tất cả"
              : "Chọn tất cả"}
          </button>
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <input
                type="checkbox"
                checked={item.isSelected}
                onChange={() => toggleSelect(item._id)}
              />
              <img src={item.image} alt={item.title} className="product-image" />
              <div>
                <h3>{item.title}</h3>
                <p>Giá: {item.price.toLocaleString()} đ</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item._id, "decrease")}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, "increase")}
                  >
                    +
                  </button>
                </div>
                <button onClick={() => removeItem(item._id)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <>
          <h2>Tổng tiền (các sản phẩm đã chọn): {calculateTotal().toLocaleString()} đ</h2>
          <button className="btn-primary" onClick={goToCheckout}>
            Thanh toán
          </button>
        </>
      )}
      <style jsx>{`
        /* CSS tối giản cho trang giỏ hàng */
.cart-page {
  font-family: 'Arial', sans-serif;
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.cart-page h1 {
  text-align: center;
  font-size: 2rem;
  color: #222;
  margin-bottom: 20px;
  font-weight: 600;
}

.cart-page h3 {
  font-size: 1rem;
  color: #333;
  margin-bottom: 20px;
}

.empty-cart {
  text-align: center;
  margin-top: 40px;
}

.empty-cart-image {
  max-width: 200px;
  margin-bottom: 15px;
  border-radius: 5px;
}

.empty-cart p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 15px;
}

.btn-shop-now {
  padding: 10px 20px;
  font-size: 1rem;
  color: #ffffff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-shop-now:hover {
  background-color: #0056b3;
}

.cart-items {
  margin-bottom: 15px;
}

.cart-item {
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 15px;
}

.cart-item h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 5px;
  color: #222;
}

.cart-item p {
  font-size: 0.9rem;
  color: #444;
  margin-bottom: 5px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin: 8px 0;
}

.quantity-controls button {
  background-color: #e0e0e0;
  color: #333;
  border: 1px solid #ccc;
  padding: 5px 10px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  margin: 0 5px;
  transition: background-color 0.2s;
}

.quantity-controls button:hover {
  background-color: #d6d6d6;
}

.quantity-controls span {
  font-size: 1rem;
  margin: 0 10px;
}

button {
  background-color: #e57373;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #d32f2f;
}

h2 {
  text-align: right;
  font-size: 1.4rem;
  color: #222;
  margin-top: 15px;
  margin-bottom: 15px;
  font-weight: 500;
}

.btn-primary {
  display: block;
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  font-size: 1.2rem;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #388e3c;
}

.btn-select-all {
  margin-bottom: 10px;
  padding: 8px 15px;
  font-size: 0.9rem;
  color: #ffffff;
  background-color: #6c757d;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-select-all:hover {
  background-color: #5a6268;
}

      `}</style>
    </div>
  );
}

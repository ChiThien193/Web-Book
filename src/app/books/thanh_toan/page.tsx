"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Goong.io API Key
const GOONG_API_KEY = "FIKHEhLmjMK1uCL7jLRlj0f9Ik7ftZMO961tqZvb";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}
interface GoongPrediction {
    description: string;
    place_id: string;
  }

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country] = useState("Vietnam");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleAddressChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAddress(value);
  
    if (value.length >= 2) { // Chỉ cần 2 ký tự
      try {
        const response = await fetch(
          `https://rsapi.goong.io/Place/AutoComplete?input=${encodeURIComponent(value)}&api_key=${GOONG_API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
  
        const data: { predictions: GoongPrediction[] } = await response.json();
        if (data.predictions) {
          setAddressSuggestions(data.predictions.map((item) => item.description));
        } else {
          setAddressSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching address suggestions:", error);
        setAddressSuggestions([]);
      }
    } else {
      setAddressSuggestions([]);
    }
  };
  

  const handleSuggestionSelect = (suggestion: string) => {
    setAddress(suggestion);
    setAddressSuggestions([]);

    const parts = suggestion.split(",").map((part) => part.trim());
    setProvince(parts[parts.length - 3] || "");
    setDistrict(parts[parts.length - 2] || "");
    setWard(parts[parts.length - 1] || "");
  };

  const validateForm = () => {
    const nameRegex = /^[\p{L}\s]{3,}$/u;
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!nameRegex.test(name)) {
      alert("Họ và tên phải có hơn 3 ký tự và không được chứa số hoặc ký tự đặc biệt.");
      return false;
    }

    if (!emailRegex.test(email)) {
      alert("Email không hợp lệ. Vui lòng nhập email đúng định dạng.");
      return false;
    }

    if (!phoneRegex.test(phone)) {
      alert("Số điện thoại phải gồm 10 chữ số và không được chứa chữ.");
      return false;
    }

    if (!province || !district || !ward || !address || !paymentMethod) {
      alert("Vui lòng điền đầy đủ thông tin địa chỉ và phương thức thanh toán.");
      return false;
    }

    return true;
  };





  const [showPopup, setShowPopup] = useState(false);

const handlePaymentMethodChange = (method: string) => {
  if (["ZaloPay", "MoMo", "ATM", "Visa"].includes(method)) {
    setShowPopup(true); // Hiển thị pop-up nếu chọn phương thức chưa hỗ trợ
    setPaymentMethod("COD"); // Mặc định lại phương thức thanh toán là COD
  } else {
    setPaymentMethod(method);
  }
};

const closePopup = () => {
  setShowPopup(false);
};


  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const orderData = {
      name,
      email,
      phone,
      country,
      province,
      district,
      ward,
      address,
      paymentMethod,
      cartItems,
      total: calculateTotal(),
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("Đơn hàng đã được gửi thành công!");
        router.push("/books/thank_you");
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="checkout-page">
      <h1>Thanh Toán</h1>

      <div className="shipping-info">
        <h2>Thông tin người nhận</h2>
        <div className="form-group">
          <label htmlFor="name">Họ và tên</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập họ và tên"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div className="form-group">
  <label htmlFor="address">Địa chỉ chi tiết nhận hàng</label>
  <input
    id="address"
    type="text"
    value={address}
    onChange={handleAddressChange}
    placeholder="Nhập địa chỉ nhận hàng"
  />
  {addressSuggestions.length > 0 && (
    <ul className="address-suggestions">
      {addressSuggestions.map((suggestion, index) => (
        <li key={index} onClick={() => handleSuggestionSelect(suggestion)}>
          {suggestion}
        </li>
      ))}
    </ul>
  )}
</div>


        <div className="form-group">
          <label htmlFor="province">Phường/Xã</label>
          <input
            id="province"
            type="text"
            value={province}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="district">Quận/Huyện</label>
          <input
            id="district"
            type="text"
            value={district}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="ward">Tỉnh/Thành phố</label>
          <input
            id="ward"
            type="text"
            value={ward}
            readOnly
          />
        </div>
      </div>

      <div className="payment-method">
  <h2>Phương thức thanh toán</h2>
  <div className="payment-options">
    <button
      className={`payment-button ${paymentMethod === "ZaloPay" ? "selected" : ""}`}
      onClick={() => handlePaymentMethodChange("ZaloPay")}
    >
      <img
        src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_zalopayapp.svg?q=10735"
        alt="ZaloPay"
      />
      Ví ZaloPay
    </button>
    <button
      className={`payment-button ${paymentMethod === "MoMo" ? "selected" : ""}`}
      onClick={() => handlePaymentMethodChange("MoMo")}
    >
      <img
        src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_momopay.svg?q=10735"
        alt="MoMo"
      />
      Ví MoMo
    </button>
    <button
      className={`payment-button ${paymentMethod === "ATM" ? "selected" : ""}`}
      onClick={() => handlePaymentMethodChange("ATM")}
    >
      <img
        src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_zalopayatm.svg?q=10735"
        alt="ATM"
      />
      ATM / Internet Banking
    </button>
    <button
      className={`payment-button ${paymentMethod === "Visa" ? "selected" : ""}`}
      onClick={() => handlePaymentMethodChange("Visa")}
    >
      <img
        src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_zalopaycc.svg?q=10735"
        alt="Visa"
      />
      Visa / Master / JCB
    </button>
    <button
      className={`payment-button ${paymentMethod === "COD" ? "selected" : ""}`}
      onClick={() => handlePaymentMethodChange("COD")}
    >
      <img
        src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_cashondelivery.svg?q=10735"
        alt="COD"
      />
      Thanh toán bằng tiền mặt khi nhận hàng
    </button>
  </div>
</div>
{showPopup && (
  <div className="popup-overlay">
    <div className="popup">
      <p>
        Xin lỗi, chức năng thanh toán online chúng tôi vẫn đang phát triển, 
        quý khách thanh toán khi nhận hàng giúp chúng tôi. Cảm ơn!
      </p>
      <button className="btn-close" onClick={closePopup}>Đóng</button>
    </div>
  </div>
)}


      <div className="order-review">
        <h2>Kiểm tra lại đơn hàng</h2>
        <div className="order-items">
          {cartItems.map((item) => (
            <div key={item._id} className="order-item">
              <img src={item.image} alt={item.title} width={80} height={120} />
              <div>
                <h3>{item.title}</h3>
                <p>Giá: {item.price.toLocaleString()} đ</p>
                <p>Số lượng: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <h3>Tổng tiền: {calculateTotal().toLocaleString()} đ</h3>
      </div>

      <button className="btn-primary" onClick={handleSubmit}>
        Xác nhận đơn hàng
      </button>

      <style jsx>{`
        .address-suggestions {
          list-style-type: none;
          padding: 0;
          margin-top: 5px;
          background-color: #fff;
          border: 1px solid #ccc;
          max-height: 200px;
          overflow-y: auto;
        }

        .address-suggestions li {
          padding: 10px;
          cursor: pointer;
        }

        .address-suggestions li:hover {
          background-color: #f1f1f1;
        }

        .checkout-page {
          font-family: Arial, sans-serif;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          font-size: 1rem;
          margin-bottom: 5px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 8px;
          font-size: 1rem;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #4CAF50;
        }

        .order-items {
          margin-bottom: 20px;
        }

        .order-item {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }

        .order-item img {
          margin-right: 15px;
        }

        .order-item h3 {
          font-size: 1.2rem;
        }

        .order-item p {
          font-size: 1rem;
        }

        .btn-primary {
          background-color: #2196F3;
          color: white;
          padding: 12px;
          font-size: 1.2rem;
          width: 100%;
          text-align: center;
          border-radius: 8px;
          cursor: pointer;
        }

        .btn-primary:hover {
          background-color: #1976D2;
        }

        .payment-options {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .payment-button {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 10px;
          background-color: #f5f5f5;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.2s, box-shadow 0.2s;
        }

        .payment-button img {
          margin-right: 10px;
          width: 36px;
          height: 36px;
        }

        .payment-button:hover {
          background-color: #eaeaea;
        }

        .payment-button.selected {
          background-color: #4CAF50;
          color: white;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        // 
        .address-suggestions {
    position: absolute; /* Giữ cố định vị trí */
    z-index: 1000;
    list-style-type: none;
    padding: 0;
    margin: 5px 0 0;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    max-height: 300px; /* Giới hạn chiều cao */
    overflow-y: auto;
    width: 100%; /* Đảm bảo cùng độ rộng với input */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .address-suggestions li {
    padding: 10px;
    cursor: pointer;
    font-size: 1rem;
    color: #333;
  }

  .address-suggestions li:hover {
    background-color: #f4f4f4;
    color: #000;
  }

  .form-group {
    position: relative; /* Để gợi ý hiển thị bên dưới input */
  }

  //

  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .popup {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    text-align: center;
    width: 90%;
    max-width: 400px;
  }

  .popup p {
    font-size: 1rem;
    margin-bottom: 20px;
  }

  .btn-close {
    background: #2196F3;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }

  .btn-close:hover {
    background: #1976D2;
  }


      `}</style>
    </div>
  );
}
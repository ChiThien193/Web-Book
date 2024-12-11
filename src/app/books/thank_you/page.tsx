"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function ThankYou() {
  const router = useRouter();

  return (
    <div className="thank-you-page">
      <h1>Cảm ơn bạn đã mua hàng!</h1>
      <p>Chúng tôi rất trân trọng sự ủng hộ của bạn và sẽ cố gắng mang lại trải nghiệm tốt nhất.</p>
      <button className="btn-home" onClick={() => router.push("/")}>Quay lại trang chủ</button>

      <style jsx>{`
        .thank-you-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: 100vh;
          background-color: #f9f9f9;
          font-family: Arial, sans-serif;
        }

        h1 {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 20px;
        }

        p {
          font-size: 1.2rem;
          color: #555;
          margin-bottom: 30px;
        }

        .btn-home {
          padding: 10px 20px;
          font-size: 1.2rem;
          color: white;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .btn-home:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}

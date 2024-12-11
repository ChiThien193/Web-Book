"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Slider from "react-slick";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";

interface Product {
  _id: string;
  title: string;
  price: number;
  image: string;
  author: string;
  genre: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Hàm tìm kiếm sản phẩm
  const handleSearch = async (searchTerm: string, searchBy: string) => {
    setLoading(true);
    try {
      const response = await axios.get<Product[]>(
        `http://localhost:5000/api/search`,
        {
          params: {
            term: searchTerm,
            searchBy: searchBy,
          },
        }
      );
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

  // Lấy tất cả sản phẩm khi component được mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:5000/api/products"
        );
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
      <Header onSearch={handleSearch} />
      <div className="carousel-container mb-8">
        <Slider {...settings}>
          <div className="slide">
            <Image
              src="/qc/qc1.webp"
              alt="Banner 1"
              layout="intrinsic"
              width={1200}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="slide">
            <Image
              src="/qc/qc2.webp"
              alt="Banner 2"
              layout="intrinsic"
              width={1200}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="slide">
            <Image
              src="/qc/qc3.webp"
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
      <div className="book-list">
        {loading ? (
          <p>Đang tải sản phẩm...</p>
        ) : products.length === 0 ? (
          <p>Không tìm thấy sản phẩm nào phù hợp với tìm kiếm của bạn.</p>
        ) : (
          products.slice(0, 8).map((product) => (
            <div
              className="book-item"
              key={product._id}
              onClick={() => router.push(`/books/${product._id}`)}
            >
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
      <Footer />
    </div>
  );
}

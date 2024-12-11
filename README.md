# WEBSITE BÁN SÁCH ONLINE

## **Mô tả tả dự án**

Dự án "WEBSITE BÁN SÁCH ONLINE" được phát triển bởi **Nhóm 4**, nhằm mục tiêu cung cấp một nền tảng bán sách trực tuyến với hiệu năng cao, giao diện hiện đại, và hệ thống backend được bảo mật.

## **1. Công nghệ sử dụng**

### **1.1. Frontend**

- **Next.js (v14.2.14)**: Framework React hỗ trợ server-side rendering (SSR) và static site generation (SSG).
- **React (v18)** và **React DOM (v18)**: Thư viện giao diện người dùng hiện đại.
- **Tailwind CSS (v3.4.13)**: Thiết kế giao diện nhanh chóng, tiện lợi.
- **Axios**: Gửi và quản lý các yêu cầu HTTP.
- **React Icons** và **React Slick**: Thêm biểu tượng và slider giao diện.

### **1.2. Backend**

- **Express**: Framework xây dựng API và backend.
- **MongoDB** và **Mongoose**: Quản lý cơ sở dữ liệu NoSQL.
- **Crypto-js**: Mã hóa dữ liệu.
- **dotenv**: Quản lý biến môi trường.
- **CORS**: Xử lý bảo mật cross-origin.

### **1.3. Công cụ phát triển**

- **TypeScript (v5)**: Hỗ trợ viết mã tĩnh, giảm thiểu lỗi runtime.
- **ESLint** và **eslint-config-next**: Kiểm tra lỗi cú pháp và chuẩn mã nguồn.
- **PostCSS** và **Autoprefixer**: Tự động tối ưu CSS tương thích trình duyệt.

---

## **2. Cấu hình Next.js**

### **2.1. Cấu hình tối ưu hình ảnh**

- Cho phép tải hình từ domain **cdn0.fahasa.com** trong file `next.config.mjs`:

```javascript
module.exports = {
  images: {
    domains: ["cdn0.fahasa.com"],
  },
};
```

- **Lợi ích:**
  - Tự động điều chỉnh kích thước, định dạng và nén hình.
  - Tăng tính bảo mật bằng cách giới hạn domain.

---

## **3. Scripts trong package.json**

- **dev**: Chạy ứng dụng trong môi trường phát triển.
  ```bash
  npm run dev
  ```
- **build**: Build ứng dụng cho sản xuất.
  ```bash
  npm run build
  ```
- **start**: Khởi chạy ứng dụng đã build.
  ```bash
  npm start
  ```
- **lint**: Kiểm tra lỗi code theo ESLint.
  ```bash
  npm run lint
  ```

---

## **4. Hướng dẫn chạy dự án**

### **4.1. Backend**

1. Di chuyển vào thư mục backend:
   ```bash
   cd backend
   ```
2. Cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   ```
3. Khởi chạy backend:
   ```bash
   node index.js
   ```

### **4.2. Frontend**

1. Di chuyển vào thư mục frontend:
   ```bash
   cd frontend
   ```
2. Cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   ```
3. Chạy frontend trong môi trường phát triển:
   ```bash
   npm run dev
   ```
4. Truy cập giao diện ứng dụng tại:
   ```
   http://localhost:3000
   ```

---

## **5. Thông tin nhóm**

**Nhóm 4**: Phát triển và duy trì dự án

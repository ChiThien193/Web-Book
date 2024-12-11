export default {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Proxy API từ frontend đến backend
      },
    ];
  },
  images: {
    domains: ['cdn0.fahasa.com', 'your-domain.com'], // Thêm domain cho hình ảnh bên ngoài
  },
};

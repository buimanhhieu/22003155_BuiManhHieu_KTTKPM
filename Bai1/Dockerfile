# Sử dụng node:18 làm base image theo yêu cầu
FROM node:18

# Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# Sao chép file mã nguồn vào thư mục làm việc
COPY app.js .

# Mở cổng 3000 để truy cập từ bên ngoài
EXPOSE 3000

# Lệnh để khởi chạy ứng dụng
CMD ["node", "app.js"]
# --- STAGE 1: Build Stage ---
# Sử dụng image node:18 đầy đủ để cài đặt thư viện
FROM node:18 AS build-stage

WORKDIR /app

# Copy các file quản lý thư viện
COPY package*.json ./

# Cài đặt các dependencies (bao gồm cả devDependencies nếu cần để build)
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# (Nếu có bước build như 'npm run build' cho React/NestJS thì thêm tại đây)


# --- STAGE 2: Run Stage ---
# Sử dụng image node:18-alpine siêu nhẹ để chạy ứng dụng
FROM node:18-alpine

WORKDIR /app

# Chỉ copy những thứ cần thiết từ stage trước (build-stage)
# Ở đây ta copy thư mục node_modules và các file code
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/server.js ./server.js
COPY --from=build-stage /app/package.json ./package.json

# Khai báo port
EXPOSE 3000

# Lệnh khởi chạy ứng dụng
CMD ["node", "server.js"]
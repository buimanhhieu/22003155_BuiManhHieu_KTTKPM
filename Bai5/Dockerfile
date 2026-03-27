# --- Stage 1: Build stage ---
FROM golang:1.21-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy các file quản lý thư viện (nếu có) và tải về
COPY go.mod ./
# RUN go mod download 

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng thành file binary tên là "main"
# CGO_ENABLED=0 giúp file chạy được trên các image linux siêu nhẹ (như alpine)
RUN CGO_ENABLED=0 GOOS=linux go build -o main main.go

# --- Stage 2: Run stage ---
FROM alpine:latest

WORKDIR /root/

# Chỉ copy file đã build từ stage "builder" sang stage này
COPY --from=builder /app/main .

# Mở cổng 8080
EXPOSE 8080

# Chạy ứng dụng
CMD ["./main"]
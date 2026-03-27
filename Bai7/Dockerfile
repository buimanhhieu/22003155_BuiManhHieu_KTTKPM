# Sử dụng python:3.9 làm base image theo yêu cầu
FROM python:3.9

# Thiết lập thư mục làm việc
WORKDIR /app

# Cài đặt thư viện Flask trực tiếp
RUN pip install flask

# Copy file mã nguồn vào container
COPY app.py .

# Mở cổng 5000
EXPOSE 5000

# Lệnh để chạy ứng dụng
CMD ["python", "app.py"]
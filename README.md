1. Danh sách công việc
Truy vấn: GET http://localhost:8000/api/congviec
Ví dụ: GET http://localhost:8000/api/congviec


<!-- 1.1 Danh sách công việc sắp xếp
Truy vấn: GET http://localhost:8000/api/congViec/danhSachCongViec?sort&column=???&type=???
- Trong đó: 
+ column: là tên cột cần sắp xếp. Ví dụ: TenCongViec, MoTaCongViec, NgayBatDau, NgayKetThuc,  TrangThai, UuTien
+ type: là kiểu sắp xếp. Ví dụ: DESC (Sắp xếp giảm dần), ASC (Sắp xếp tăng dần).
Ví dụ: GET http://localhost:8000/api/congViec/danhSachCongViec?sort&column=TenCongViec&type=DESC

1.2 Danh sách công việc có phân trang
Truy vấn: GET http://localhost:8000/api/congViec/danhSachCongViec?page=???&limit=???
- Trong đó: 
+ page: là số trang. Ví dụ: page=3
+ limit: là số lượng kết quả cần hiển thị. Ví dụ: limit=5.
Ví dụ: GET http://localhost:8000/api/congViec/danhSachCongViec?page=3&limit=5 -->



2. Công việc theo ID
Truy vấn: GET http://localhost:8000/api/congviec/:id
- Trong đó: 
+ :id: là mã công việc. Ví dụ: 040620232012201112321
Ví dụ: http://localhost:8000/api/congviec/040620232012201112321





3. Tìm kiếm công việc theo tên
Truy vấn: GET http://localhost:8000/api/timCongViec?search=xxxx
- Trong đó: 
+ xxxx: là tên công việc. Ví dụ: HHHFH
Ví dụ: http://localhost:8000/api/timCongViec?search=HHHFH




4. Thêm công việc thuộc dự án
Truy vấn: POST http://localhost:8000/api/congviec/:id
- Trong đó: 
+ :id: là mã dự án. Ví dụ: 040620232012201112321
Data: 
{
    "TenCongViec": "TEST by Huynh Anh 3", 
    "MoTaCongViec": "Test by Huynh Anh 3", 
    "NgayBatDau": "2023-05-15", 
    "NgayKetThuc": "2023-07-15", 
    "TrangThai": 0, 
    "UuTien": 1
}



5. Sửa công việc
Truy vấn: PUT http://localhost:8000/api/congviec/:id
- Trong đó: 
+ :id: là mã công việc. Ví dụ: 040620232012201112321
Ví dụ: http://localhost:8000/api/congviec/040620232012201112321
Data: 
{
    "TenCongViec": "TEST by Huynh Anh", 
    "MoTaCongViec": "Test by Huynh Anh", 
    "NgayBatDau": "2023-05-15", 
    "NgayKetThuc": "2023-07-15", 
    "TrangThai": 0, 
    "UuTien": 1,
    "MaDuAn": "DA1687249828346"
}



6. Xóa công việc tạm thời
Truy vấn: DELETE http://localhost:8000/api/congviec/:id
- Trong đó: 
+ :id: là mã công việc. Ví dụ: 040620232012201112321
Ví dụ: http://localhost:8000/api/congviec/040620232012201112321




7. Xóa vĩnh viễn công việc
Truy vấn: DELETE http://localhost:8000/api/xoaCongViecVinhVien/:id
- Trong đó: 
+ :id: là mã công việc. Ví dụ: 040620232012201112321
Ví dụ: http://localhost:8000/api/xoaCongViecVinhVien/040620232012201112321


8. Phân công công việc
Truy vấn: POST http://localhost:8000/api/congviec/phanCongCongViec/:id
- Trong đó: 
+ :id: là mã công việc. Ví dụ: 040620232012201112321
Ví dụ: http://localhost:8000/api/congviec/phanCongCongViec/040620232012201112321


9. Sửa phân công công việc
Truy vấn: PUT http://localhost:8000/api/congviec/editPhanCongCongViec/:id
- Trong đó: 
+ :id: là mã công việc. Ví dụ: 040620232012201112321
Ví dụ: http://localhost:8000/api/congviec/editPhanCongCongViec/040620232012201112321


10. Lấy danh sách công việc thuộc dự án
Truy vấn: GET http://localhost:8000/api/congviecbyduan/:id
- Trong đó: 
+ :id: là mã dự án


11. Lấy danh sách người dùng thực hiện công việc
Truy vấn: GET http://localhost:8000/api/nguoidungbycongviec/:id
- Trong đó: 
+ :id: là mã công việc



12. Lấy danh sách tài liệu cho công việc
Truy vấn: GET http://localhost:8000/api/tailieubycongviec/:id
- Trong đó: 
+ :id: là mã công việc


13. Thêm danh sách công việc thuộc dự án từ file excel
Truy vấn: POST http://localhost:8000/api/congviecfile/:id
- Trong đó: 
+ :id: là mã dự án

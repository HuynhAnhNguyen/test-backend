const { query } = require('express');
const { connection } = require('../config/index');
const moment = require('moment');

// Lấy toàn bộ người dùng
const getAllNguoiDung = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const query = 'SELECT * FROM nguoidung';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn: ', error);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu.' });
        } else 
        {
            res.json(results);
        }
    });
}

// Thêm người dùng
const postNguoiDung = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    // const { originalname } = req.file;
    const timestamp = moment().format('x');
    const MaNguoiDung = 'ND' + timestamp;
    const TrangThai = 0;
    const { HoLot, Ten, Email, DiaChi, SoDienThoai, ViTri, GioiTinh, Username, Password } = req.body;
    // Lưu thông tin tài liệu vào cơ sở dữ liệu
    const query = 'INSERT INTO nguoidung (MaNguoiDung, HoLot, Ten, Email, DiaChi, SoDienThoai, ViTri, GioiTinh, TrangThai, Username, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [MaNguoiDung, HoLot, Ten, Email, DiaChi, SoDienThoai, ViTri, GioiTinh, TrangThai, Username, Password], (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn: ', error);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu.' });
        } else {
            const querySelect = 'SELECT * FROM nguoidung WHERE MaNguoiDung = ?';
            connection.query(querySelect, [MaNguoiDung], (error, resultSelect) => {
                if (error) {
                    console.error('Lỗi truy vấn: ', error);
                    res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu.' });
                } else {
                    const newNguoiDung = resultSelect[0]; // Lấy dữ liệu người dùng mới
                    res.json({ message: 'Chỉnh sửa người dùng thành công.', nguoiDung: newNguoiDung });
                }
            });
        }
    });
}

// Chỉnh sửa người dùng
const putNguoiDung = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const MaNguoiDung = req.params.id;
    // const { originalname } = req.file;
    const { HoLot, Ten, Email, DiaChi, SoDienThoai, ViTri, GioiTinh, TrangThai } = req.body;
    const query = 'UPDATE nguoidung SET HoLot = ?, Ten = ?, Email = ?, DiaChi = ?, SoDienThoai = ?, ViTri = ?, GioiTinh = ?, TrangThai = ? WHERE MaNguoiDung = ?'
    connection.query(query, [HoLot, Ten, Email, DiaChi, SoDienThoai, ViTri, GioiTinh, TrangThai, MaNguoiDung], (error) => {
        if (error) {
            console.error('Lỗi truy vấn: ', error);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu.' });
        } else {
            const querySelect = 'SELECT * FROM nguoidung WHERE MaNguoiDung = ?';
            connection.query(querySelect, [MaNguoiDung], (error, resultSelect) => {
                if (error) {
                    console.error('Lỗi truy vấn: ', error);
                    res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu.' });
                } else {
                    const newNguoiDung = resultSelect[0]; // Lấy dữ liệu người dùng mới
                    res.json({ message: 'Thêm người dùng thành công.', nguoiDung: newNguoiDung });
                }
            });
        }
    });
}

// Xóa người dùng
const deleteNguoiDung = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const id = req.params.id;
    const query = 'DELETE FROM nguoidung WHERE MaNguoiDung = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn: ', error);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu.' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Không tìm thấy người dùng.' });
        } else {
            res.json({ message: 'Xóa người dùng thành công.' });
        }
    });
}


function getNguoiDung(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    const nguoidungId = req.params.id;

    // Query SQL để tìm người dùng theo id
    const query = 'SELECT * FROM nguoidung WHERE MaNguoiDung = ?';

    connection.query(query, [nguoidungId], (err, result) => {
    if (err) {
      console.error('Lỗi khi tìm người dùng:', err);
      return res.status(500).json({ error: 'Lỗi khi tìm người dùng.' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng.' });
    }

    // Trả về người dùng tìm được
    const nguoidung = result[0];
    return res.status(200).json(nguoidung);
  });
};


// Tìm kiếm
const searchNguoiDung = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { keyword } = req.query;
  
    // Tạo câu truy vấn để tìm kiếm người dùng LIKE, OR, AND, ... cú pháp sql sẽ không phân biệt chữ hoa hoặc thường khi nhận vào keyword
    const query = `SELECT * FROM nguoidung WHERE MaNguoiDung LIKE ? OR HoLot LIKE ? OR Ten LIKE ? OR Email LIKE ? OR SoDienThoai LIKE ? OR DiaChi LIKE ? OR Username LIKE ?`;
    const searchKeyword = `%${keyword}%`;
  
    connection.query(query, [searchKeyword, searchKeyword, searchKeyword, searchKeyword, searchKeyword, searchKeyword, searchKeyword], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn: ', error);
        res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu.' });
      } else {
        res.json({ nguoiDung: results });
      }
    });
  };

module.exports = {
    getAllNguoiDung,
    getNguoiDung,
    postNguoiDung,
    putNguoiDung,
    deleteNguoiDung,
    searchNguoiDung,
}

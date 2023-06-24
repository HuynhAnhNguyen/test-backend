const express = require("express");
const nguoidungRouter = express.Router();
const nguoidungController = require('../controllers/nguoidung.controller');

// nguoidung.route.js

nguoidungRouter.get('/nguoidung', nguoidungController.getAllNguoiDung);
nguoidungRouter.put('/nguoidung/:id', nguoidungController.putNguoiDung);
nguoidungRouter.post('/nguoidung', nguoidungController.postNguoiDung);
nguoidungRouter.delete('/nguoidung/:id', nguoidungController.deleteNguoiDung);
nguoidungRouter.get('/nguoidung/search', nguoidungController.searchNguoiDung);
nguoidungRouter.get('/nguoidung/:id', nguoidungController.getNguoiDung);

module.exports = nguoidungRouter;

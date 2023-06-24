const express = require("express");
const duanRouter = express.Router();
const duanController = require('../controllers/duan.controller');

//Thêm dự án
duanRouter.post('/duan', duanController.postDuAn);

//Xóa dự án
duanRouter.delete('/duan/:id', duanController.deleteDuAn);

//lấy hết dự án
duanRouter.get('/duan', duanController.getAllDuAn);

////lấy hết dự án
duanRouter.get('/duan/:id', duanController.getDuAn);

//cập nhật dự án
duanRouter.put('/duan/:id', duanController.putDuAn);

module.exports = duanRouter;
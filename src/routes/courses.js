const express = require('express');
const router = express.Router(); //Định tuyến của express

const courseController = require('../app/controllers/CourseController'); //Nhận giá trị từ NewsController

//đọc từ trên xuông

router.get('/create', courseController.create); //Nếu định tuyến là create thì sẽ chạy hàm create trong file CourseController.js
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.post('/handle-form-actions', courseController.handleFormActions)
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore); //Khôi phục
router.delete('/:id', courseController.remove); //xóa vào thùng rác
router.delete('/:id/force', courseController.forceRemove); //xóa vĩnh viễn
router.get('/:slug', courseController.show);

module.exports = router; //trả dữ liệu qua file index.js để hiển thị thông tin ra màn hình

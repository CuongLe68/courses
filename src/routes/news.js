const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController'); //Nhận giá trị từ NewsController

//đọc từ trên xuông

router.get('/:slug', newsController.show);
router.get('/', newsController.index);

module.exports = router;

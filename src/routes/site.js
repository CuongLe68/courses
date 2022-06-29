const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

//đọc từ trên xuông

router.get('/search', siteController.search);
router.get('/', siteController.index);

module.exports = router;

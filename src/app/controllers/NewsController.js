class NewsController {
    //[GET] / news
    index(req, res) {
        res.render('news');
    }

    //[GET] / news/:slug(biến thay đổi, vd:course/phim-bo, course/phim-le)
    show(req, res) {
        res.send('New show');
    }
}

module.exports = new NewsController();

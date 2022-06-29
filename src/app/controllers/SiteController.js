const Course = require('../models/Course'); // ./ chấm là tới file nào đó ../ là lùi lại lại 1 file rồi tới file nào đó
const { mutipleMongooseToObject } = require('../../util/mongoose'); // để trong dấu {} để nhận được các giá trị trong đó(../ là lùi lại file trước)

class SiteController {
    //[GET] /
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch((error) => next(error));
    }

    //[GET] / search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();

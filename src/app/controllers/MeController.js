const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let CourseQuery = Course.find({});

        if(req.query.hasOwnProperty('_sort')) {
            CourseQuery = CourseQuery.sort({
                [req.query.column]: req.query.type
            });
        }

        Promise.all([CourseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) => {
                res.render('me/stored-courses', {
                    deleteCount,
                    courses: mutipleMongooseToObject(courses)
                })
            })
            .catch(next)
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', {
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next)
    }

}

module.exports = new MeController();

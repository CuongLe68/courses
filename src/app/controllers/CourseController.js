const Course = require('../models/Course'); // ./ chấm là tới file nào đó ../ là lùi lại lại 1 file rồi tới file nào đó
const { mongooseToObject } = require('../../util/mongoose'); // để trong dấu {} để nhận được các giá trị trong đó(../ là lùi lại file trước)

class CourseController {
    //[GET] / courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    //[GET] / courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //Lưu khóa học
    //[POST] / courses/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //Show ra khóa học cần sửa
    //[GET] / courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id) //Lấy id của đối tượng click vào
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            })) //callback function nhận đối số course, nếu link tới courses/edit sẽ rả thằng course 
            .catch(next)
    }

    //Chỉnh sửa khóa học
    //[PUT] / courses/:id
    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body) //id của đối tượng click, req.body:Chứa các cặp key-value của dữ liệu được đệ trình trong phần body của Request
            .then(() => res.redirect('/me/stored/courses')) //redirect: chuyển hướng tới /me/stored/courses
            .catch(next);
    }

    //Xóa khóa học (vào thùng rác)
    //[Delete] / courses/:id
    remove(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back')) //Thêm location ở respon để điều hướng quay lại trang trước
            .catch(next);
    }

    //Xóa khóa học (vĩnh viễn)
    //[Delete] / courses/:id/force
    forceRemove(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //Khôi phục khóa học
    //[PATCH] / courses/:id/restore
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('back')) //Thêm location ở respon để điều hướng quay lại trang trước
            .catch(next);
    }

    //Xử lý xóa khi submit form
    //[POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch(req.body.action) { //req.body.action: value của chế độ xóa
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } }) //Lấy id ở trong courseIds trong form submit gửi lên khi submit
                    .then(() => res.redirect('back')) //Thêm location ở respon để điều hướng quay lại trang trước
                    .catch(next);
                break
            default:
                res.send('Action is invalid!!!');
        }
    }
}

module.exports = new CourseController();

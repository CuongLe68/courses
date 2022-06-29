const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        _id: {type: Number},
        name: { type: String, require: true }, //Bắt buộc phải nhập
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255 },
        videoId: { type: String, maxLength: 255 },
        level: { type: String, maxLength: 255 },
        slug: { type: String, slug: 'name', unique: true }, //unique: true k được 2 tên slug giống nhau bằng cách thêm 1 shortstring sau slug
    },
    {
        _id: false,
        timestamps: true,
    },
);

//add plugin
mongoose.plugin(slug);

Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete,
     { 
        deletedAt: true,
        overrideMethods: 'all', 
    });

module.exports = mongoose.model('Course', Course);

module.exports = {
    mutipleMongooseToObject: function (mongooses) {
        //nhận đối số là course ở site controller //hàm này dùng trong trường hợp trả về tất cả course
        return mongooses.map((mongoose) => mongoose.toObject());
    },
    mongooseToObject: function (mongooses) {
        //hàm này dùng trong trường hợp trả về 1 course
        return mongooses ? mongooses.toObject() : mongooses;
    },
};

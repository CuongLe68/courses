module.exports = function SortMiddleware (req, res, next) {
    res.locals._sort = { //kiểm tra enabled và type của _sort
        enabled: false, //Mặc dịnh chưa sắp xếp là false
        type: 'default' // kiểu là default là mặc định chưa sắp xếp
    }

    if(req.query.hasOwnProperty('_sort')) { //Nếu có đuôi ?_sort
        // res.locals._sort.enabled = true; //đổi lại value của enbled là true
        // res.locals._sort.type = req.query.type; // đổi lại value của type là type trên url
        // res.locals._sort.column = req.query.column; // đổi lại value của column là name trên url

        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column,
        });
    }

    next();
}
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const route = require('./routes');
const db = require('./config/db'); //Liên kết với file database là mongoose

//connect to DB
db.connect();

app.use(express.static(path.join(__dirname, '/publics'))); //file tĩnh thì mặc định vào publics(tự đặt tên file)

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

app.get('/middleware', 
    function(req, res, next) {
        if(['vethuong', 'vevip'].includes(req.query.ve)) { // kiểm tra chuỗi nhập vào có trùng với chuổi lập trình sẵn không và trả về true false
            req.face = 'Gach Gach Gach';
            return next(); //Chuyển tới function tiếp theo 
        }
        res.status(403).json({ //Nếu chuỗi sai thì hiển thị thông báo này
            message: 'Cút'
        })

    },
    function(req, res, next) {
        res.json({
            message: 'OK rồi nhá',
            face: req.face,
        })
    }
)

// custom middleware
app.use(SortMiddleware);

//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b, //Dùng để thực hiện phép cộng trong handelbars ở stared-courses.hbs
            sortable: (field, sort) => {
                //Kiểm tra nếu field(value của column) truyền vào từ browser nếu bằng với sort.column thì dùng icon tương ứng còn k thò dùng icon mặc định
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = { 
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };
                
                const icon = icons[sortType]; //Nhận các icon tương ứng với value của sort
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                </a>`;
            }
        }
    }),
); //handlebars sử dụng thu viện express-handlebars
app.set('view engine', 'hbs'); //sử dụng view engine cho handlebars
app.set('views', path.join(__dirname, 'resources', 'views')); // Thiết lập lại đường dẫn cho file

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}, http://localhost:${port}`);
});

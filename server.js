const express = require('express');
const session = require('express-session');
const indexRouter = require('./api/index.router');
const app = express();
const logMiddleware = require('./api/common/middlewares/logMiddleware');
const users = require('./api/users/users.ctrl');
const products = require('./api/products/products.ctrl');
const path = require('path');
const cookieParser = require('cookie-parser');


const PORT = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware)
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
}));
app.use(cookieParser());
app.use('/api', indexRouter)
app.set('views', path.join(__dirname, 'views'));

// pug
app.engine('pug', require('pug').__express);

// ejs
app.engine('ejs', require('ejs').__express);

app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
})


app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})
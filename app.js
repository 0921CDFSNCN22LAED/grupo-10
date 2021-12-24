const path = require('path');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.listen(3000, () => {
  console.log('Server running on port 3000.');
});
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(
  session({ secret: 'clave secreta', resave: false, saveUninitialized: false })
);

const mainRouter = require('./routers/mainRouter.js');
app.use('/', mainRouter);

const productsRouter = require('./routers/productsRouter.js');
app.use('/products', productsRouter);

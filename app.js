const path = require('path');
const express = require('express');
const app = express();

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.listen(3000, () => {
  console.log('Server running on port 3000.');
});
app.set('view engine', 'ejs');

const mainRouter = require('./routers/mainRouter.js');
app.use('/', mainRouter);

const productsRouter = require('./routers/productsRouter.js');
app.use ('/products', productsRouter);
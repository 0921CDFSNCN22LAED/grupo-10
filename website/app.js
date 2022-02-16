const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const loguser = require('./middleware/loguser.js');
const taxonomy = require('./middleware/taxonomy.js');
const flashErrors = require('./middleware/flashErrors');
const cookieLogger = require('./middleware/cookieLogger.js');

const mainRouter = require('./routers/mainRouter.js');
const productsRouter = require('./routers/productsRouter.js');
const apiRouter = require('./api/routers/apiRouter.js');

const cors = require('cors');
var corsOptions = {
  origin: '*',
};

//DEMASIADOS PERMISOS BORRAR ALGUNOS
app.use(cors(corsOptions));
let allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  );
  next();
};
app.use(allowCrossDomain);

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.listen(3001, () => {
  console.log('Server running on port 3001.');
});
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(
  session({ secret: 'clave secreta', resave: false, saveUninitialized: false })
);
app.use(cookieParser());

app.use(cookieLogger);
app.use(flashErrors);
app.use(taxonomy);

app.use(loguser);
app.use('/', mainRouter);
app.use('/api', apiRouter);

app.use('/products', productsRouter);

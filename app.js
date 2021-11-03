const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));
app.listen(3000, () => {
  console.log('Server running on port 3000.');
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "views/index.html"));
});
app.get('/detalle-producto', (req, res) => {
  res.sendFile(path.resolve(__dirname, "views/detalle-producto.html"));
});
app.get('/carrito-producto', (req, res) => {
  res.sendFile(path.resolve(__dirname, "views/carrito-producto.html"));
});
app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, "views/login.html"));
});
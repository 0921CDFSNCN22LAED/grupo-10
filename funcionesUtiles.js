//Formatear números a pesos argentinos
const product = {
  price: '25909',
};

function convertToPesos(product) {
  return new Intl.NumberFormat('es-Ar', {
    style: 'currency',
    currency: 'ARS',
  }).format(product.price);
}

console.log(convertToPesos(product));

import { useEffect, useState } from 'react';

function LastProduct() {
  const [lastProduct, setLastProduct] = useState([]);
  useEffect(async () => {
    const responseFetch = await fetch(
      'http://localhost:3001/api/products/last-product'
    );
    const dataJson = await responseFetch.json();
    setLastProduct(dataJson.data);
  }, []);

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Último producto cargado
          </h5>
        </div>
        <div className="card-body">
          <div className="text-center">
            {/* <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              style={{ width: '40em' }}
              src="assets/images/mandalorian.jpg"
              alt=" Star Wars - Mandalorian "
            /> */}
          </div>
          <h2>{lastProduct.name}</h2>
          <p>{lastProduct.description}</p>
          <p>Precio: ${lastProduct.price}</p>
          <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">
            Detalle de producto
          </a>
        </div>
      </div>
    </div>
  );
}

export default LastProduct;

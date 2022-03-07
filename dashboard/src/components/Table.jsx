import React, { useEffect, useState } from 'react';
import TableRow from './TableRow';

function Table() {
  //   let products = [
  //     {
  //       id: 1,
  //       name: 'Mouse Logitech GPRO Test',
  //       price: '$ 10.000',
  //       description:
  //         'El mouse inalámbrico G Pro tiene un Sensor Hero 25K es Ultraligero y tambien tiene un diseño ergonómico ambidiestro',
  //       discount: '',
  //       category_id: 1,
  //       subTaxonomy_id: 106,
  //       updatedAt: null,
  //       deletedAt: null,
  //       category: 'Oferta',
  //       'subTaxonomy.id': 106,
  //       'subTaxonomy.name': 'Mouses',
  //       'subTaxonomy.taxonomy_id': 2,
  //       'subTaxonomy.taxonomy.id': 2,
  //       'subTaxonomy.taxonomy.name': 'Peripherals',
  //       'productsImages.id': 3,
  //       'productsImages.location': 'logitech-gpro.jfif',
  //       'productsImages.cover': 1,
  //       'productsImages.product_id': 1,
  //       'categoryData.id': 1,
  //       'categoryData.name': 'Oferta',
  //       'taxonomy.0': 'Peripherals',
  //       'taxonomy.1': 'Mouses',
  //       image: 'logitech-gpro.jfif',
  //     },
  //     {
  //       id: 2,
  //       name: 'Geforce RTX 3090',
  //       price: '$ 400.000',
  //       description:
  //         'GeForce RTX 3090 VENTUS 3X OC - tarjeta gráfica - GF RTX 3090 - 24 GB - Tipo de dispositivo:Tarjeta gráfica - Tipo de bus:PCI Express 4.0 - Motor gráfico:NVIDIA GeForce RTX 3090 - Memoria:24 GB GDDR6X - Velocidad de la memoria:19.5 Gbps - Núcleos CUDA:10496 - Interfaz de memoria:384-bit - Máxima Resolución:7680 x 4320 - N° máximo de monitores soportados:4 - Interfaces:3 x DisplayPort ¦ HDMI - Apoyado por API:DirectX 12, OpenGL 4.6',
  //       discount: '',
  //       category_id: 1,
  //       subTaxonomy_id: 8,
  //       updatedAt: null,
  //       deletedAt: null,
  //       category: 'Oferta',
  //       'subTaxonomy.id': 8,
  //       'subTaxonomy.name': 'Placas de video',
  //       'subTaxonomy.taxonomy_id': 1,
  //       'subTaxonomy.taxonomy.id': 1,
  //       'subTaxonomy.taxonomy.name': 'Hardware',
  //       'productsImages.id': 1,
  //       'productsImages.location': 'placa-video.jfif',
  //       'productsImages.cover': 1,
  //       'productsImages.product_id': 2,
  //       'categoryData.id': 1,
  //       'categoryData.name': 'Oferta',
  //       'taxonomy.0': 'Hardware',
  //       'taxonomy.1': 'Placas de video',
  //       image: 'placa-video.jfif',
  //     },
  //     {
  //       id: 3,
  //       name: 'Teclado HyperX Alloy Fps',
  //       price: '$ 12.000',
  //       description:
  //         'El Teclado HyperX Alloy Fps tiene un diseño ultra minimalista sin llave (TKL) ideal para FPS Pro, tiene switches mecánicos Cherry MX, con teclas retroiluminadas con efectos de ilimunacion dinamicos',
  //       discount: '10.00% off',
  //       category_id: 1,
  //       subTaxonomy_id: 108,
  //       updatedAt: null,
  //       deletedAt: null,
  //       category: 'Oferta',
  //       'subTaxonomy.id': 108,
  //       'subTaxonomy.name': 'Teclados',
  //       'subTaxonomy.taxonomy_id': 2,
  //       'subTaxonomy.taxonomy.id': 2,
  //       'subTaxonomy.taxonomy.name': 'Peripherals',
  //       'productsImages.id': 4,
  //       'productsImages.location': 'teclado.jfif',
  //       'productsImages.cover': 1,
  //       'productsImages.product_id': 3,
  //       'categoryData.id': 1,
  //       'categoryData.name': 'Oferta',
  //       'taxonomy.0': 'Peripherals',
  //       'taxonomy.1': 'Teclados',
  //       image: 'teclado.jfif',
  //     },
  //     {
  //       id: 4,
  //       name: 'Gabinete Gamer',
  //       price: '$ 50',
  //       description:
  //         'El gabinete Gamer con Luces frontales RGB y ventana lateral de acrilico MT-235GM será el espacio ideal para que tu hardware esté bien refrigerado y completamente a la vista.',
  //       discount: '30.00% off',
  //       category_id: 1,
  //       subTaxonomy_id: 5,
  //       updatedAt: null,
  //       deletedAt: null,
  //       category: 'Oferta',
  //       'subTaxonomy.id': 5,
  //       'subTaxonomy.name': 'Gabinetes',
  //       'subTaxonomy.taxonomy_id': 1,
  //       'subTaxonomy.taxonomy.id': 1,
  //       'subTaxonomy.taxonomy.name': 'Hardware',
  //       'productsImages.id': 8,
  //       'productsImages.location': 'gabinete-gamer.jfif',
  //       'productsImages.cover': 1,
  //       'productsImages.product_id': 4,
  //       'categoryData.id': 1,
  //       'categoryData.name': 'Oferta',
  //       'taxonomy.0': 'Hardware',
  //       'taxonomy.1': 'Gabinetes',
  //       image: 'gabinete-gamer.jfif',
  //     },
  //     {
  //       id: 5,
  //       name: 'Motherboard Asus Z490',
  //       price: '$ 59.990',
  //       description:
  //         'Tarjeta Madre Intel Z490, Ethernet de 1 Gb, HDMI, DisplayPort, SATA 6Gbps, USB 3.2 Gen 2, soporte Thunderbolt™ 3 e iluminación Aura Sync RGB Socket Intel® LGA 1200: Listo para procesadores Intel® Core ™ de 10a generación.',
  //       discount: '30.00% off',
  //       category_id: 1,
  //       subTaxonomy_id: 7,
  //       updatedAt: null,
  //       deletedAt: null,
  //       category: 'Oferta',
  //       'subTaxonomy.id': 7,
  //       'subTaxonomy.name': 'Motherboards',
  //       'subTaxonomy.taxonomy_id': 1,
  //       'subTaxonomy.taxonomy.id': 1,
  //       'subTaxonomy.taxonomy.name': 'Hardware',
  //       'productsImages.id': 9,
  //       'productsImages.location': 'placa-madre-asus.jpg',
  //       'productsImages.cover': 1,
  //       'productsImages.product_id': 5,
  //       'categoryData.id': 1,
  //       'categoryData.name': 'Oferta',
  //       'taxonomy.0': 'Hardware',
  //       'taxonomy.1': 'Motherboards',
  //       image: 'placa-madre-asus.jpg',
  //     },
  //     {
  //       id: 6,
  //       name: 'Procesador Core I9',
  //       price: '$ 58.999',
  //       description:
  //         'Procesador de escritorio desbloqueado Intel Core i9-10900K de 10ª generación. Con la tecnología Intel Turbo Boost Max 3. 0, los procesadores de escritorio Intel Core de 10ª generación desbloqueados están optimizados para jugadores entusiastas y creadores serios y ayudan a ofrecer overclocking de alto rendimiento para un impulso adicional. Solución térmica no incluida en la caja.',
  //       discount: '30.00% off',
  //       category_id: 2,
  //       subTaxonomy_id: 9,
  //       updatedAt: null,
  //       deletedAt: null,
  //       category: 'Artículo destacado',
  //       'subTaxonomy.id': 9,
  //       'subTaxonomy.name': 'Procesadores',
  //       'subTaxonomy.taxonomy_id': 1,
  //       'subTaxonomy.taxonomy.id': 1,
  //       'subTaxonomy.taxonomy.name': 'Hardware',
  //       'productsImages.id': 5,
  //       'productsImages.location': 'core-i9.jpg',
  //       'productsImages.cover': 1,
  //       'productsImages.product_id': 6,
  //       'categoryData.id': 2,
  //       'categoryData.name': 'Artículo destacado',
  //       'taxonomy.0': 'Hardware',
  //       'taxonomy.1': 'Procesadores',
  //       image: 'core-i9.jpg',
  //     },
  //     {
  //       id: 7,
  //       name: 'Teclado Mecanico Razer Hunstaman Mini',
  //       price: '$ 18.190',
  //       description:
  //         'Un teclado para juegos reducido al 60  de su tamaño y con sus punteros switches ópticos Razer™. Portátil e ideal para escritorios reducidos, es hora de experimentar un accionamiento a la velocidad de la luz.',
  //       discount: '',
  //       category_id: 2,
  //       subTaxonomy_id: 108,
  //       updatedAt: null,
  //       deletedAt: null,
  //       category: 'Artículo destacado',
  //       'subTaxonomy.id': 108,
  //       'subTaxonomy.name': 'Teclados',
  //       'subTaxonomy.taxonomy_id': 2,
  //       'subTaxonomy.taxonomy.id': 2,
  //       'subTaxonomy.taxonomy.name': 'Peripherals',
  //       'productsImages.id': 6,
  //       'productsImages.location': 'teclado-razer.jpg',
  //       'productsImages.cover': 1,
  //       'productsImages.product_id': 7,
  //       'categoryData.id': 2,
  //       'categoryData.name': 'Artículo destacado',
  //       'taxonomy.0': 'Peripherals',
  //       'taxonomy.1': 'Teclados',
  //       image: 'teclado-razer.jpg',
  //     },
  //     {
  //       id: 8,
  //       name: 'Memoria Ram Hyperx 8gb',
  //       price: '$ 9000',
  //       description:
  //         'Memoria Ram Gamer Kingston Hyperx Fury 8gb Rgb Ddr4 3600mhz',
  //       discount: '15.00% off',
  //       category_id: 1,
  //       subTaxonomy_id: 6,
  //       updatedAt: null,
  //       deletedAt: null,
  //       category: 'Oferta',
  //       'subTaxonomy.id': 6,
  //       'subTaxonomy.name': 'Memorias Ram',
  //       'subTaxonomy.taxonomy_id': 1,
  //       'subTaxonomy.taxonomy.id': 1,
  //       'subTaxonomy.taxonomy.name': 'Hardware',
  //       'productsImages.id': null,
  //       'productsImages.location': null,
  //       'productsImages.cover': null,
  //       'productsImages.product_id': null,
  //       'categoryData.id': 1,
  //       'categoryData.name': 'Oferta',
  //       'taxonomy.0': 'Hardware',
  //       'taxonomy.1': 'Memorias Ram',
  //       image: null,
  //     },
  //     {
  //       id: 9,
  //       name: 'Mouse Gamer Razer Viper Mini 8500DPI',
  //       price: '$ 5000',
  //       description:
  //         'Mouse Gamer ultra liviano de alta velocidad. Por su ergonomía ermite que las personas diestras o zurdas puedan utilizarlo y personalizar la configuración.',
  //       discount: '',
  //       category_id: 2,
  //       subTaxonomy_id: 106,
  //       updatedAt: null,
  //       deletedAt: null,
  //       category: 'Artículo destacado',
  //       'subTaxonomy.id': 106,
  //       'subTaxonomy.name': 'Mouses',
  //       'subTaxonomy.taxonomy_id': 2,
  //       'subTaxonomy.taxonomy.id': 2,
  //       'subTaxonomy.taxonomy.name': 'Peripherals',
  //       'productsImages.id': 2,
  //       'productsImages.location': 'razer-vipermini.jpg',
  //       'productsImages.cover': 1,
  //       'productsImages.product_id': 9,
  //       'categoryData.id': 2,
  //       'categoryData.name': 'Artículo destacado',
  //       'taxonomy.0': 'Peripherals',
  //       'taxonomy.1': 'Mouses',
  //       image: 'razer-vipermini.jpg',
  //     },
  //     {
  //       id: 10,
  //       name: 'Redragon K530 Draconic',
  //       price: '$ 11.000',
  //       description:
  //         'Primer teclado Redragon 60% Diseño ultra minimalista sin teclas (TKL) con 61 teclas portátil que libera espacio de mesa para movimiento del ratón, que ofrece el rendimiento más puro para FPS Pro',
  //       discount: '25.00% off',
  //       category_id: 1,
  //       subTaxonomy_id: 108,
  //       updatedAt: null,
  //       deletedAt: null,
  //       category: 'Oferta',
  //       'subTaxonomy.id': 108,
  //       'subTaxonomy.name': 'Teclados',
  //       'subTaxonomy.taxonomy_id': 2,
  //       'subTaxonomy.taxonomy.id': 2,
  //       'subTaxonomy.taxonomy.name': 'Peripherals',
  //       'productsImages.id': 12,
  //       'productsImages.location': 'teclado-redragon.jpg',
  //       'productsImages.cover': 1,
  //       'productsImages.product_id': 10,
  //       'categoryData.id': 1,
  //       'categoryData.name': 'Oferta',
  //       'taxonomy.0': 'Peripherals',
  //       'taxonomy.1': 'Teclados',
  //       image: 'teclado-redragon.jpg',
  //     },
  //     {
  //       id: 11,
  //       name: 'KIT AMD Ryzen 7 4700S 4.0 Ghz',
  //       price: '$ 37.000',
  //       description:
  //         'Microprocesador\r\nModeloRyzen 7 4700S\r\nNucleos8\r\nFrecuencia4.0\r\nMotherboard\r\nChipsetKit\r\nRanuras PCIe1 Ranura PCIe® X16, Compatible Con (Señal X4 Gen 2)\r\nMemoria Ram\r\nTamaño De Memoria16 GB\r\nPlaca De Video Compatibles\r\nLista De Tarjetas Gráficas CompatiblesAMD Radeon™ 550,RX 550,RX 560,RX 570,RX 580, RX 590, GT 1030­,GTX 1050­, GTX 1050 Ti­, GTX 1060\r\nAlimentacion\r\nWattsDe 250W, Como Mínimo. Se Recomienda De 300W En Adelante.\r\nPuertos SATA\r\nSata2\r\nPuertos\r\nPuertos De E/S (Panel Trasero)Pantalla NO; Audio SÍ; 3 USB3 Gen2 Más 1 Gen1; 4 USB2\r\nConectores\r\nConectores En El Panel Delantero2 USB3 Gen1; Conector De Audio HD',
  //       discount: '10.00% off',
  //       category_id: 1,
  //       subTaxonomy_id: 7,
  //       updatedAt: null,
  //       deletedAt: null,
  //       category: 'Oferta',
  //       'subTaxonomy.id': 7,
  //       'subTaxonomy.name': 'Motherboards',
  //       'subTaxonomy.taxonomy_id': 1,
  //       'subTaxonomy.taxonomy.id': 1,
  //       'subTaxonomy.taxonomy.name': 'Hardware',
  //       'productsImages.id': null,
  //       'productsImages.location': null,
  //       'productsImages.cover': null,
  //       'productsImages.product_id': null,
  //       'categoryData.id': 1,
  //       'categoryData.name': 'Oferta',
  //       'taxonomy.0': 'Hardware',
  //       'taxonomy.1': 'Motherboards',
  //       image: null,
  //     },
  //     {
  //       id: 12,
  //       name: 'Radeon R5 220 2GB DDR3 AFOX',
  //       price: '$ 11.999',
  //       description:
  //         'Marca:\tAFOX  \r\nMemoria:\t2GB GDDR3\r\nPlaca de Video:\tRadeon R5 220 2GB DDR3 AFOX\r\nPantalla:\tResolución Max 2560 x 1600\r\nPuerto HDMI:\t1x VGA - 1x DVI - 1x HDMI',
  //       discount: '',
  //       category_id: null,
  //       subTaxonomy_id: 7,
  //       updatedAt: null,
  //       deletedAt: null,
  //       category: null,
  //       'subTaxonomy.id': 7,
  //       'subTaxonomy.name': 'Motherboards',
  //       'subTaxonomy.taxonomy_id': 1,
  //       'subTaxonomy.taxonomy.id': 1,
  //       'subTaxonomy.taxonomy.name': 'Hardware',
  //       'productsImages.id': null,
  //       'productsImages.location': null,
  //       'productsImages.cover': null,
  //       'productsImages.product_id': null,
  //       'categoryData.id': null,
  //       'categoryData.name': null,
  //       'taxonomy.0': 'Hardware',
  //       'taxonomy.1': 'Motherboards',
  //       image: null,
  //     },
  //   ];
  const wantedHeaders = ['id', 'name', 'price', 'discount', 'category'];
  let [products, setProducts] = useState('');
  let [productKeys, setProductKeys] = useState('');

  useEffect(() => {
    const url = 'http://localhost:3001/api/products/flattened';

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        let products = await response.json();
        products = products.data;
        const productsKeys = Object.keys(products[0]).filter((key) =>
          wantedHeaders.includes(key)
        );

        products = products.map((product) => {
          for (let property of Object.keys(product)) {
            if (!wantedHeaders.includes(property)) {
              delete product[property];
            }
          }
          return product;
        });
        setProducts(products);
        setProductKeys(productsKeys);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-4">
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            {productKeys ? (
              productKeys.map((productKey, i) => {
                return (
                  <th scope="col" key={productKey + i}>
                    {productKey}
                  </th>
                );
              })
            ) : (
              <th>cargando</th>
            )}
          </tr>
        </thead>
        <tbody>
          {products ? (
            products.map((product) => {
              return <TableRow {...product} key={product.id} />;
            })
          ) : (
            <tr>
              <td>cargando</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

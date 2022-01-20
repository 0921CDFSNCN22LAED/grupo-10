'use strict';

//Categories id
// 1: Oferta
// 2: ArtDestacado

// taxonomy id
//1: Hardware {
//      1: "Coolers",
//      2: "Disco Rígido HDD",
//      3: "Disco Solido SDD",
//      4: "Fuentes",
//      5: "Gabinetes",
//      6: "Memorias Ram",
//      7: "Motherboards",
//      8: "Placas de video",
//      9:  "Procesadores"}
// 2: Peripherals {
//     100: "Almacenamiento",
//     101: "Auriculares",
//     102: "Impresoras",
//     103: "Joysticks",
//     104: "Micrófonos",
//     105: "Monitores",
//     106: "Mouses",
//     107: "Parlantes",
//     108: "Teclados",
//     109:"Web cams",
//     110: "Pads y otros"
// }

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        id: 2,
        name: 'Geforce RTX 3090',
        description:
          'GeForce RTX 3090 VENTUS 3X OC - tarjeta gráfica - GF RTX 3090 - 24 GB - Tipo de dispositivo:Tarjeta gráfica - Tipo de bus:PCI Express 4.0 - Motor gráfico:NVIDIA GeForce RTX 3090 - Memoria:24 GB GDDR6X - Velocidad de la memoria:19.5 Gbps - Núcleos CUDA:10496 - Interfaz de memoria:384-bit - Máxima Resolución:7680 x 4320 - N° máximo de monitores soportados:4 - Interfaces:3 x DisplayPort ¦ HDMI - Apoyado por API:DirectX 12, OpenGL 4.6',
        price: 400000.0,
        category_id: 1,
        subTaxonomy_id: 8,
        discount: 0,
      },
      {
        id: 9,
        name: 'Mouse Gamer Razer Viper Mini 8500DPI',
        description:
          'Mouse Gamer ultra liviano de alta velocidad. Por su ergonomía ermite que las personas diestras o zurdas puedan utilizarlo y personalizar la configuración.',
        price: 5000,
        category_id: 2,
        subTaxonomy_id: 106,
      },
      {
        id: 1,
        name: 'Mouse Logitech GPRO Test',
        price: 10000,
        discount: 0,
        category_id: 1,
        subTaxonomy_id: 106,
        description:
          'El mouse inalámbrico G Pro tiene un Sensor Hero 25K es Ultraligero y tambien tiene un diseño ergonómico ambidiestro',
      },
      {
        id: 3,
        name: 'Teclado HyperX Alloy Fps',
        price: 12000,
        discount: 10,
        category_id: 1,
        subTaxonomy_id: 108,
        description:
          'El Teclado HyperX Alloy Fps tiene un diseño ultra minimalista sin llave (TKL) ideal para FPS Pro, tiene switches mecánicos Cherry MX, con teclas retroiluminadas con efectos de ilimunacion dinamicos',
      },
      {
        id: 6,
        name: 'Procesador Core I9',
        price: 58999,
        discount: 30,
        category_id: 2,
        subTaxonomy_id: 9,
        description:
          'Procesador de escritorio desbloqueado Intel Core i9-10900K de 10ª generación. Con la tecnología Intel Turbo Boost Max 3. 0, los procesadores de escritorio Intel Core de 10ª generación desbloqueados están optimizados para jugadores entusiastas y creadores serios y ayudan a ofrecer overclocking de alto rendimiento para un impulso adicional. Solución térmica no incluida en la caja.',
      },
      {
        id: 7,
        name: 'Teclado Mecanico Razer Hunstaman Mini',
        price: 18190,
        discount: 0,
        category_id: 2,
        description:
          'Un teclado para juegos reducido al 60  de su tamaño y con sus punteros switches ópticos Razer™. Portátil e ideal para escritorios reducidos, es hora de experimentar un accionamiento a la velocidad de la luz.',
        subTaxonomy_id: 108,
      },
      {
        id: 1640781064038,
        name: 'Procesador AMD RYZEN 7 3700X 4.4 GHz',
        price: 45900,
        discount: 0,
        category_id: 2,
        description:
          'Modelo\r\nRYZEN 7 3700X\r\nSocket\r\nAM4 Ryzen 3th Gen\r\nNúcleos\r\n8\r\nFrecuencia\r\n3600.00 mhz\r\nProceso De Fabricación\r\n7 nm\r\nChipset Gpu\r\nNO Posee Gráficos Integrados\r\nHilos\r\n16\r\nFrecuencia Turbo\r\n4400 mhz\r\nFamilia\r\nAMD RYZEN 7',
        subTaxonomy_id: 9,
      },
      {
        id: 4,
        name: 'Gabinete Gamer',
        price: 50.0,
        discount: 30,
        category_id: 1,
        description:
          'El gabinete Gamer con Luces frontales RGB y ventana lateral de acrilico MT-235GM será el espacio ideal para que tu hardware esté bien refrigerado y completamente a la vista.',
        subTaxonomy_id: 5,
      },
      {
        id: 5,
        name: 'Motherboard Asus Z490',
        price: 59990,
        discount: 30,
        category_id: 1,
        description:
          'Tarjeta Madre Intel Z490, Ethernet de 1 Gb, HDMI, DisplayPort, SATA 6Gbps, USB 3.2 Gen 2, soporte Thunderbolt™ 3 e iluminación Aura Sync RGB Socket Intel® LGA 1200: Listo para procesadores Intel® Core ™ de 10a generación.',
        subTaxonomy_id: 7,
      },
      {
        id: 1641413542112,
        name: 'KIT AMD Ryzen 7 4700S 4.0 Ghz - Motherboard Mini-ITX - 16GB GDDR6',
        price: 37000,
        discount: 10,
        category_id: 1,
        description:
          'Microprocesador\r\nModeloRyzen 7 4700S\r\nNucleos8\r\nFrecuencia4.0\r\nMotherboard\r\nChipsetKit\r\nRanuras PCIe1 Ranura PCIe® X16, Compatible Con (Señal X4 Gen 2)\r\nMemoria Ram\r\nTamaño De Memoria16 GB\r\nPlaca De Video Compatibles\r\nLista De Tarjetas Gráficas CompatiblesAMD Radeon™ 550,RX 550,RX 560,RX 570,RX 580, RX 590, GT 1030­,GTX 1050­, GTX 1050 Ti­, GTX 1060\r\nAlimentacion\r\nWattsDe 250W, Como Mínimo. Se Recomienda De 300W En Adelante.\r\nPuertos SATA\r\nSata2\r\nPuertos\r\nPuertos De E/S (Panel Trasero)Pantalla NO; Audio SÍ; 3 USB3 Gen2 Más 1 Gen1; 4 USB2\r\nConectores\r\nConectores En El Panel Delantero2 USB3 Gen1; Conector De Audio HD',
        subTaxonomy_id: 7,
      },
      {
        id: 1641412110777,
        name: 'Radeon R5 220 2GB DDR3 AFOX',
        price: 11.999,
        discount: 0,
        category_id: null,
        description:
          'Marca:\tAFOX  \r\nMemoria:\t2GB GDDR3\r\nPlaca de Video:\tRadeon R5 220 2GB DDR3 AFOX\r\nPantalla:\tResolución Max 2560 x 1600\r\nPuerto HDMI:\t1x VGA - 1x DVI - 1x HDMI',
        subTaxonomy_id: 7,
      },
      {
        id: 10,
        name: 'Redragon K530 Draconic',
        price: 11000,
        discount: 25,
        category_id: 1,
        description:
          'Primer teclado Redragon 60% Diseño ultra minimalista sin teclas (TKL) con 61 teclas portátil que libera espacio de mesa para movimiento del ratón, que ofrece el rendimiento más puro para FPS Pro',
        subTaxonomy_id: 108,
      },
      {
        id: 8,
        name: 'Memoria Ram Hyperx 8gb',
        price: 9000,
        discount: 15,
        category_id: 1,
        description:
          'Memoria Ram Gamer Kingston Hyperx Fury 8gb Rgb Ddr4 3600mhz',
        subTaxonomy_id: 6,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};

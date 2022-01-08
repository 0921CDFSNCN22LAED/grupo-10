//Carousel Hardware y Periféricos
// hardware-stick;
function moveCarousel() {
  const vw = window.innerWidth;
  let cardWidth = 100;
  if (vw >= 992) {
    cardWidth = 25;
  } else if (vw >= 768) {
    cardWidth = 33;
  } else if (vw >= 576) {
    cardWidth = 50;
  } else {
    cardWidth = 100;
  }
  if (document.getElementById('hardware-carousel')) {
    const cardQty = document.getElementsByClassName('hardware-card').length;
    const maxWidth = -(cardWidth * cardQty - 100);
    let position = 0;
    document
      .querySelector('.carousel-control-next-icon.custom.hardware')
      .addEventListener('click', () => {
        position > maxWidth ? (position -= cardWidth) : (position = 0);
        document.getElementById(
          'hardware-stick'
        ).style.cssText = `transform: translateX(${position}%);
              transition: transform 1s;`;
      });
    document
      .querySelector('.carousel-control-prev-icon.custom.hardware')
      .addEventListener('click', () => {
        position >= 0 ? (position = maxWidth) : (position += cardWidth);
        document.getElementById(
          'hardware-stick'
        ).style.cssText = `transform: translateX(${position}%);
                    transition: transform 1s;`;
      });
    if (cardWidth * cardQty <= 100) {
      document.querySelector(
        '.carousel-control-next-icon.custom.hardware'
      ).style.display = 'none';
      document.querySelector(
        '.carousel-control-prev-icon.custom.hardware'
      ).style.display = 'none';
    }
  }

  // peripherals-stick;
  if (document.getElementById('peripherals-carousel')) {
    const cardQtyP = document.getElementsByClassName('peripherals-card').length;
    const maxWidthP = -(cardWidth * cardQtyP - 100);
    let positionP = 0;
    document
      .querySelector('.carousel-control-next-icon.custom.peripheral')
      .addEventListener('click', () => {
        positionP > maxWidthP ? (positionP -= cardWidth) : (positionP = 0);
        document.getElementById(
          'peripherals-stick'
        ).style.cssText = `transform: translateX(${positionP}%);
          transition: transform 1s;`;
      });
    document
      .querySelector('.carousel-control-prev-icon.custom.peripheral')
      .addEventListener('click', () => {
        positionP >= 0 ? (positionP = maxWidthP) : (positionP += cardWidth);
        document.getElementById(
          'peripherals-stick'
        ).style.cssText = `transform: translateX(${positionP}%);
                transition: transform 1s;`;
      });
    if (cardWidth * cardQtyP <= 100) {
      document.querySelector(
        '.carousel-control-next-icon.custom.peripheral'
      ).style.display = 'none';
      document.querySelector(
        '.carousel-control-prev-icon.custom.peripheral'
      ).style.display = 'none';
    }
  }
  //other-stick
  if (document.getElementById('others-carousel')) {
    const cardQtyO = document.getElementsByClassName('others-card').length;
    const maxWidthO = -(cardWidth * cardQtyO - 100);
    let positionO = 0;
    document
      .querySelector('.carousel-control-next-icon.custom.other')
      .addEventListener('click', () => {
        positionO > maxWidthO ? (positionO -= cardWidth) : (positionO = 0);
        document.getElementById(
          'others-stick'
        ).style.cssText = `transform: translateX(${positionO}%);
          transition: transform 1s;`;
      });
    document
      .querySelector('.carousel-control-prev-icon.custom.other')
      .addEventListener('click', () => {
        positionO >= 0 ? (positionO = maxWidthO) : (positionO += cardWidth);
        document.getElementById(
          'others-stick'
        ).style.cssText = `transform: translateX(${positionO}%);
                transition: transform 1s;`;
      });
    if (cardWidth * cardQtyO <= 100) {
      document.querySelector(
        '.carousel-control-next-icon.custom.other'
      ).style.display = 'none';
      document.querySelector(
        '.carousel-control-prev-icon.custom.other'
      ).style.display = 'none';
    }
  }
}

moveCarousel();

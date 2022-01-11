//Carousel Hardware y Periféricos

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
  if (document.getElementsByClassName('custom-carousel')) {
    const carousels = document.getElementsByClassName('custom-carousel');
    for (let i = 0; i < carousels.length; i++) {
      carousels[i].setAttribute('id', `carousel-${i}`);
      const cardQty = document.querySelectorAll(
        `#carousel-${i} .c-card`
      ).length;
      const maxWidth = -(cardWidth * cardQty - 100);
      let position = 0;
      document
        .querySelector(`#carousel-${i} .carousel-control-next-icon.custom`)
        .addEventListener('click', () => {
          position > maxWidth ? (position -= cardWidth) : (position = 0);
          document.querySelector(
            `#carousel-${i} .custom-stick`
          ).style.cssText = `transform: translateX(${position}%);
                  transition: transform 1s;`;
        });
      document
        .querySelector(`#carousel-${i} .carousel-control-prev-icon.custom`)
        .addEventListener('click', () => {
          position >= 0 ? (position = maxWidth) : (position += cardWidth);
          document.querySelector(
            `#carousel-${i} .custom-stick`
          ).style.cssText = `transform: translateX(${position}%);
                        transition: transform 1s;`;
        });
      if (cardWidth * cardQty <= 100) {
        document.querySelector(
          `#carousel-${i} .carousel-control-next-icon.custom`
        ).style.display = 'none';
        document.querySelector(
          `#carousel-${i} .carousel-control-prev-icon.custom`
        ).style.display = 'none';
      }
    }
  }
}

moveCarousel();

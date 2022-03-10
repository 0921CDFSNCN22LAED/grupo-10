window.onload = () => {
  function removeFadeOut() {
    const element = document.querySelector('.nextPageMessage');
    const speed = 5 * 1000;
    var seconds = speed / 1000;
    element.style.transition = 'opacity ' + seconds * 1.5 + 's ease-in';

    element.style.opacity = 0;
    setTimeout(function () {
      element.parentNode.removeChild(element);
    }, speed);
  }

  removeFadeOut();
};

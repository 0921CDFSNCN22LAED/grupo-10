// Creta product and Edit Product Taxonomy Options
function taxOptions() {
  document.getElementById('taxonomy').addEventListener('change', function () {
    if (this.value == 'Hardware') {
      document.getElementById('taxonomyHardware').classList.add('d-block');
      document.getElementById('taxonomyHardware').classList.remove('d-none');
      document.getElementById('taxonomyPeripherals').classList.add('d-none');
      document
        .getElementById('taxonomyPeripherals')
        .classList.remove('d-block');
      document.getElementById('taxonomyPeripherals').value = '';
    } else if (this.value == 'Periféricos') {
      document.getElementById('taxonomyHardware').classList.add('d-none');
      document.getElementById('taxonomyHardware').classList.remove('d-block');
      document.getElementById('taxonomyHardware').value = '';
      document.getElementById('taxonomyPeripherals').classList.add('d-block');
      document.getElementById('taxonomyPeripherals').classList.remove('d-none');
    } else {
      document.getElementById('taxonomyHardware').classList.add('d-none');
      document.getElementById('taxonomyHardware').classList.remove('d-block');
      document.getElementById('taxonomyPeripherals').classList.add('d-none');
      document
        .getElementById('taxonomyPeripherals')
        .classList.remove('d-block');
      document.getElementById('taxonomyHardware').value = '';
      document.getElementById('taxonomyPeripherals').value = '';
    }
  });
}

taxOptions();

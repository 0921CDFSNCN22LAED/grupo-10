window.onload = () => {
  const formulario = document.querySelector('form.form-crearProducto');

  formulario.addEventListener('submit', (e) => {
    const name = document.getElementById('name');
    const description = document.getElementById('description');
    const image = document.getElementById('image');
    const divErrores = document.querySelector('div.errores');
    divErrores.innerHTML = '';
    const errores = [];

    if (name.value == '') {
      errores.push('Ingresá un nombre de producto');
    } else if (name.value.length < 5) {
      errores.push('El nombre debe tener al menos 5 caracteres');
    }

    if (description.value.length < 20) {
      errores.push('La descripción debe tener al menos 20 caracteres');
    }

    const allowedMimeType = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
    ];
    const mimeType = image.files[0]?.type;
    if (image.value != '' && !allowedMimeType.includes(mimeType)) {
      errores.push('Imagen inválida');
    }

    if (errores.length > 0) {
      e.preventDefault();

      //   const divErrores = document.querySelector('div.errores div');
      for (let i = 0; i < errores.length; i++) {
        divErrores.innerHTML +=
          '<div class="feedback-crearProducto p-1 w-100">' +
          errores[i] +
          '</div>';
      }
    }
  });
};

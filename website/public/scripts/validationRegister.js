const formulario = document.querySelector('form.form-register');
// const errores = document.getElementById("errores")
async function emailIsNotUnique() {
  const response = await fetch(
    `https://pc-gamer-website.herokuapp.com/api/users/email?email=${email.value}`
  );
  const data = await response.json();
  if (data) {
    return true;
  }
}
formulario.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const repassword = document.getElementById('repassword');
  const avatar = document.getElementById('avatar');
  const ulErrores = document.querySelector('div.errores ul');
  ulErrores.innerHTML = '';
  const errores = [];

  if (name.value == '') {
    errores.push('Ingresá tu nombre y apellido');
  } else if (name.value.length < 2) {
    errores.push('Tu nombre debe tener al menos 2 caracteres');
  }

  if (email.value == '') {
    errores.push('Ingresá tu email');
  } else if (!validator.isEmail(email.value)) {
    errores.push('Tu email debe ser válido');
  } else if (await emailIsNotUnique()) {
    errores.push('Ya hay una cuenta asociada al email que ingresaste.');
  }

  const regex =
    /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
  if (password.value == '') {
    errores.push('Ingresá tu contraseña');
  } else if (password.value.length < 8) {
    errores.push('Tu contraseña debe tener al menos 8 caracteres');
  } else if (!regex.test(password.value)) {
    errores.push(
      'Tu contraseña debe tener una mayuscula, minuscula , un numero y un caracter especial'
    );
  }

  if (repassword.value == '') {
    errores.push('Volvé a ingresar tu contraseña');
  } else if (repassword.value != password.value) {
    errores.push('Las contraseñas no coinciden');
  }

  const allowedMimeType = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  const mimeType = avatar.files[0]?.type;
  if (avatar.value != '' && !allowedMimeType.includes(mimeType)) {
    errores.push('Imagen inválida');
  }

  if (errores.length > 0) {
    const ulErrores = document.querySelector('div.errores ul');
    for (let i = 0; i < errores.length; i++) {
      ulErrores.innerHTML += '<li>' + errores[i] + '</li>';
    }
  } else {
    formulario.submit();
  }
});

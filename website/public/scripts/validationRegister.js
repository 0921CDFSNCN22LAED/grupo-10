const formulario = document.querySelector('form.form-register');
// const errores = document.getElementById("errores")

formulario.addEventListener('submit', async (e) => {
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

  const emailIsNotUnique = async function(){
    const response =  await fetch(`http://localhost:3001/api/users/email?email=${email.value}`)
    const data = await response.json()
    if(data){
      return true
    }
    console.log(data);
  }
  if (email.value == '') {
    errores.push('Ingresá tu email');
  } else if (!validator.isEmail(email.value)) {
    errores.push('Tu email debe ser válido');
  }else if (await emailIsNotUnique()){
    errores.push("Ya hay una cuenta asociada al email que ingresaste.")
  }



  const regex = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
  if (password.value == '') {
    errores.push('Ingresá tu contraseña');
  } else if (password.value.length < 8) {
    errores.push('Tu contraseña debe tener al menos 8 caracteres');
  } else if(!regex.test(password.value)){
    errores.push('Tu contraseña debe tener una mayuscula, minuscula , un numero y un caracter especial')
  }

  if (repassword.value == '') {
    errores.push('Volvé a ingresar tu contraseña');
  } else if (repassword.value != password.value) {
    errores.push('Las contraseñas no coinciden');
  } 

  const extension = avatar.value.slice(-4);
  const allowedExtension = ['jpeg', '.jpg', '.png', '.gif'];
  if (!allowedExtension.includes(extension)) {
    errores.push('Imagen inválida');
  }

  if (errores.length > 0) {
    e.preventDefault();

    const ulErrores = document.querySelector('div.errores ul');
    for (let i = 0; i < errores.length; i++) {
      ulErrores.innerHTML += '<li>' + errores[i] + '</li>';
    }
  }
});

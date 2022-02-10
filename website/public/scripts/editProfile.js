window.addEventListener('load', ()=>{
  const form = document.querySelector('form.form-register')
  const editButtons = document.querySelectorAll('.edit-button')
  console.log(form.elements);

  editButtons.forEach((button)=>{
    button.addEventListener('click',function(e){
      e.preventDefault()
      this.previousElementSibling.removeAttribute('disabled')
      this.previousElementSibling.focus()
      const len = this.previousElementSibling.value.length
      this.previousElementSibling.setSelectionRange(len,len)
    })
  })
})
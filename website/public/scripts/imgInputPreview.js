const avatar = document.getElementById('avatar');
const image = document.getElementById('image');
const avatarImg = document.getElementById("avatarImg");
const imageImg = document.getElementById("imageImg");

if (avatar) {
  
  avatar.onchange = () => {
    const [file] = avatar.files;
    if (file) {
      avatarImg.src = URL.createObjectURL(file);
    }
  };
} else if (image) {
  image.onchange = () => {
    const [file] = image.files;
    if (file) {
      imageImg.src = URL.createObjectURL(file);
    }
  };
}

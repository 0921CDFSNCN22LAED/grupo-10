avatar.onchange = (evt) => {
  const [file] = avatar.files;
  if (file) {
    avatarImg.src = URL.createObjectURL(file);
  }
};

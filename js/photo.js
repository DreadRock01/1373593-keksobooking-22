const FILE_TYPES = ['jpg', 'png'];
const DEFAULT_AVATAR_URL = ['img/muffin-grey.svg'];
const photoPattern = {
  WIDTH: '70',
  HEIGHT: '70',
}

const avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoChooser  = document.querySelector('.ad-form__upload input[type=file]');
const photoPreview  = document.querySelector('.ad-form__photo');

/**
 * Функция загрузки изображения
 * @param {object} fileChooser инпут, выбирающий изображение
 * @param {object} previewBlock DOM-нода, содержащая превью загруженного изображения
 */
const uploadImage = (fileChooser, previewBlock) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  })
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (previewBlock.tagName === 'IMG') {
        previewBlock.src = reader.result;
      } else {
        const img = document.createElement('img');
        img.src = reader.result;
        img.width = photoPattern.WIDTH;
        img.height = photoPattern.HEIGHT;
        previewBlock.appendChild(img);
      }
    });
    reader.readAsDataURL(file);
  }
}

avatarFileChooser.addEventListener('change', () => {
  uploadImage(avatarFileChooser, avatarPreview);
});

photoChooser.addEventListener('change', () => {
  uploadImage(photoChooser, photoPreview);
});

/**
 * Функция сброса изображений
 */
const removeImages = () => {
  avatarPreview.src = DEFAULT_AVATAR_URL;
  photoPreview.textContent = '';
};

export {
  removeImages
};

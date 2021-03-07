const adForm = document.querySelector('.ad-form');
const adFormFieldsets = document.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');

/**
 * Функция переключения возможности взаимодействия с интерактивными элементами
 * @param {string} isEnabled — состояние формы
 */
const setFormState = (isEnabled) => {
  if (!isEnabled) {
    adForm.classList.add('ad-form--disabled');
    adFormFieldsets.forEach((elem) => {
      elem.setAttribute('disabled', '');
    });
    mapFilters.classList.add('map__filters--disabled');
    [...mapFilters.elements].forEach((elem) => {  // попробовал без деструктуризации - возвращает forEach is not a function
      elem.setAttribute('disabled', '');
    });
  } else {
    adForm.classList.remove('ad-form--disabled');
    adFormFieldsets.forEach((elem) => {
      elem.removeAttribute('disabled', '');
    });
    mapFilters.classList.remove('map__filters--disabled');
    [...mapFilters.elements].forEach((elem) => {
      elem.removeAttribute('disabled', '');
    });
  }
}
setFormState(false);

export {
  setFormState
};

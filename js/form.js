const minPriceOfRent = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = document.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const housingType = document.querySelector('#type');
const pricePerNight = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');


/**
 * Функция блокировки взаимодействия с интерактивными элементами
 */
const setFormDisabled = () => {
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach((elem) => {
    elem.setAttribute('disabled','');
  });
  mapFilters.classList.add('map__filters--disabled');
  [...mapFilters.elements].forEach((elem) => {
    elem.setAttribute('disabled','');
  });
}
setFormDisabled();


/**
 * Функция активации взаимодействия с интерактивными элементами
 */
const setFormEnabled = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach((elem) => {
    elem.removeAttribute('disabled','');
  });
  mapFilters.classList.remove('map__filters--disabled');
  [...mapFilters.elements].forEach((elem) => {
    elem.removeAttribute('disabled','');
  });
}

housingType.addEventListener('change', (evt) => {
  pricePerNight.min = pricePerNight.placeholder = minPriceOfRent[evt.target.value];
})

timeIn.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
})

timeOut.addEventListener('change', (evt) => {
  timeIn.value = evt.target.value;
})

export {
  setFormEnabled
};

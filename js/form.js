import {
  sendData
} from './fetch.js'

import {
  resetMap
} from './map.js'

import {
  createSuccessMessage,
  createErrorMessage
} from './modal.js'

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = document.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelects = mapFilters.querySelectorAll('.map__filter');
const clearBtn = document.querySelector('.ad-form__reset');

/**
 * Функция возврата страницы к исходному состоянию
 */
const resetForms = () => {
  adForm.reset();
  mapFilters.reset();
  setTimeout(() => {
    resetMap();
  }, 100);
};

/**
 * !Функция чтобы не вешать resetForms() на createSuccessMessage() в модале
 */
const succesFormSent = () => {
  createSuccessMessage();
  resetForms();
}

/**
 * Функция отправки формы
 */
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(succesFormSent, createErrorMessage, new FormData(evt.target));
});

/**
 * Функция возврата страницы к исходному состоянию по нажатию "очистить"
 */
clearBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForms();
});

/**
 * Функция переключения возможности взаимодействия с интерактивными элементами
 * @param {string} isEnabled состояние формы
 */
const setFormState = (isEnabled) => {
  if (!isEnabled) {
    adForm.classList.add('ad-form--disabled');
    adFormFieldsets.forEach((elem) => {
      elem.setAttribute('disabled', '');
    });
    mapFilters.classList.add('map__filters--disabled');
    mapFiltersSelects.forEach((elem) => {
      elem.setAttribute('disabled', '');
    });
  } else {
    adForm.classList.remove('ad-form--disabled');
    adFormFieldsets.forEach((elem) => {
      elem.removeAttribute('disabled', '');
    });
    mapFilters.classList.remove('map__filters--disabled');
    mapFiltersSelects.forEach((elem) => {
      elem.removeAttribute('disabled', '');
    });
  }
}
setFormState(false);


export {
  resetForms,
  setFormState
};

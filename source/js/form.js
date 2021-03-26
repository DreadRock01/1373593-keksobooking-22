import {
  sendData
} from './fetch.js'

import {
  renderPins,
  resetMap
} from './map.js'

import {
  createSuccessMessage,
  createErrorMessage
} from './modal.js'

import {
  removeImages
} from './photo.js'

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = document.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelects = mapFilters.querySelectorAll('.map__filter');
const clearBtn = document.querySelector('.ad-form__reset');

/**
 * Функция сброса полей формы и селектов фильтрации
 */
const resetFormFilters = () => {
  adForm.reset();
  mapFilters.reset();
}

/**
 * Функция сброса формы при чистке или успешной отправке формы
 * @param {object} announcements массив полученных данных
 */
const setFormReset = (announcements) => {
  clearBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetFormFilters();
    removeImages();
    resetMap();
    renderPins(announcements)
  });
};

/**
 * Функция, вызываемая в случае успешной отправки данных формы
 */
const sendFormSuccess = () => {
  createSuccessMessage();
  resetFormFilters()
  resetMap();
  removeImages();
}

/**
 * Функция отправки данных формы на сервер
 * @param {object} announcements массив полученных данных
 */
const setActionForm = (announcements) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(() => {
      sendFormSuccess();
      renderPins(announcements);
    }, createErrorMessage, new FormData(evt.target));
  });
};

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
      elem.removeAttribute('disabled');
    });
    mapFilters.classList.remove('map__filters--disabled');
    mapFiltersSelects.forEach((elem) => {
      elem.removeAttribute('disabled');
    });
  }
}
setFormState(false);

export {
  setFormReset,
  setActionForm,
  setFormState
};

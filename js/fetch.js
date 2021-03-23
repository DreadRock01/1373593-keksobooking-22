import {
  showErrorGetData
} from './map.js'

import {
  setFormState
} from './form.js'

const GET_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const SEND_URL = 'https://22.javascript.pages.academy/keksobooking';

/**
 * Функция загрузки объявлений и отображения их на карте
 * @param {function} onSuccess колбэк для установки меток на карту в случае успешного получения данных
 */
const getData = (onSuccess) => {
  fetch(GET_URL)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      setFormState(false);
      showErrorGetData('Ошибка при загрузке данных объявлений');
    });
};

/**
 * Функция отображения модала в зависимости от результата обращения к серверу
 * @param {function} onSuccess колбэк в случае успешной отправки формы
 * @param {function} onFail колбэк в случае неудачной отправки формы
 * @param {object} body объект с полями для ввода данных
 */
const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {
  getData,
  sendData
};

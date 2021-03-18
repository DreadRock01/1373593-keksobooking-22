import {
  showErrorGetData
} from './map.js'

/**
 * Функция загрузки объявлений и отображения их на карте
 * @param {function} onSuccess колбэк для установки меток на карту в случае успешного получения данных
 */
const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showErrorGetData('Ошибка при загрузке данных объявлений');
    });
};

/**
 * Функция отображения модала в зависимости от результата обращения к серверу
 * @param  {function} onSuccess колбэк в случае успешной отправки формы
 * @param  {function} onFail колбэк в случае неудачной отправки формы
 * @param  {object} body объект с полями для ввода данных
 */
const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onSuccess();
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

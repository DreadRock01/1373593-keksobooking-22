import {
  isEscEvent
} from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const main = document.querySelector('main');

/**
 * Клавиши
 * @param {object} evt объект события
 */
const onModalKeyPress = (evt) => {
  isEscEvent(evt, modalHide);
};

/**
 * Функция скрытия модала после отправки формы
 */
const modalHide = () => {
  const modal = main.querySelector('.success') || main.querySelector('.error');
  modal.remove();
  document.removeEventListener('keydown', onModalKeyPress);
};

/**
 * Функция показа сообщения об успешной отправке формы
 */
const createSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  successMessage.style.zIndex = 1000;
  main.append(successMessage);
  document.addEventListener('keydown', onModalKeyPress);
  successMessage.addEventListener('click', modalHide);
}

/**
 * Функция показа сообщения об ошибке
 */
const createErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorBtn = errorMessage.querySelector('.error__button');
  errorMessage.style.zIndex = 1000;
  main.append(errorMessage);
  document.addEventListener('keydown', onModalKeyPress);
  errorBtn.addEventListener('click', modalHide);
  errorMessage.addEventListener('click', modalHide);
}

export {
  onModalKeyPress,
  modalHide,
  createSuccessMessage,
  createErrorMessage
}


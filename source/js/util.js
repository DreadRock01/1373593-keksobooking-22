const ERR_SHOW_TIME = 5000;

/**
 * Функция склонения слов после числа
 * @param {number} n число перед словом
 * @param {array} words массив с вариантами слов
 * @returns {string} полученное слово в зависимости от числа
 */
const changeWordsFormat = (number, words) => {
  number = Math.abs(number) % 100;
  const number1 = number % 10;
  if (number > 10 && number < 20) {
    return words[2];
  }
  if (number1 > 1 && number1 < 5) {
    return words[1];
  }
  if (number1 === 1) {
    return words[0];
  }
  return words[2];
}

/**
 * Функция показа ошибки на карте при загрузке данных объявлений
 * @param {string} err текст ошибки
 */
const showErrorGetData = (err) => {
  const mapContainer = document.querySelector('.map');
  const errorContainer = document.createElement('div');

  errorContainer.style.zIndex = 1000;
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = 0;
  errorContainer.style.top = 0;
  errorContainer.style.right = 0;
  errorContainer.style.padding = '14px 5px';
  errorContainer.style.fontSize = '18px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.color = 'white';
  errorContainer.style.backgroundColor = 'red';

  errorContainer.textContent = err;

  mapContainer.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, ERR_SHOW_TIME);
};

/**
 * Функция проверки нажатия клавиши "Esc"
 * @param {object} evt объект события
 * @param {object} action функция
 */
const isEscEvent = (evt, action) => {
  if (evt.key === ('Escape' || 'Esc')) {
    action()
  }
}

export {
  changeWordsFormat,
  showErrorGetData,
  isEscEvent
};

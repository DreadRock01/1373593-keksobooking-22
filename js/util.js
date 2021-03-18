const keyCodes = {
  ESC: 27,
  ENTER: 13,
}

/**
 * Функция получения случайного целого числа из переданного диапазона включительно
 * @param {number} min минимальное значение
 * @param {number} max максимальное значение
 * @returns {number} случайное число
 */
const getRandomNubmerFromRange = (min, max) => {
  if (min >= 0 && max > 0 && max > min) {
    let randomNumber = min + Math.random() * (max - min + 1);
    return Math.floor(randomNumber);
  }
  return 'Ошибка. Диапазон может быть только положительным';
}

/**
 * Функция получения случайного дробного числа из переданного диапазона включительно
 * @param {number} min минимальное значение
 * @param {number} max максимальное значение
 * @param {number} n количество знаков после запятой
 * @returns {number} случайное число
 */
const getRandomFloatNubmerFromRange = (min, max, n) => {
  if (min >= 0 && max > 0 && max > min) {
    let randomNumber = min + Math.random() * (max - min);
    return randomNumber.toFixed(n);
  }
  return 'Ошибка. Диапазон может быть только положительным';
}

/**
 * Функция получения случайного элемента из массива
 * @param {array} arr массив
 * @returns {string} случайный элемент массива
 */
const getRandomElementFromArray = (arr) => {
  return arr[getRandomNubmerFromRange(0, arr.length - 1)];
};

/**
 * Функция получения массива случайной длины без повторений
 * @param  {array} arr массив
 * @returns {array} массив случайной длины
 */
const getRandomLenghtArray = (arr) => {
  const randomLength = getRandomNubmerFromRange(1, arr.length);
  let tempArr = arr.slice();
  let resultArr = [];

  for (let i = 0; i < randomLength; i++) {
    let randomIndex = getRandomNubmerFromRange(0, tempArr.length - 1);
    let randomElement = tempArr.splice(randomIndex, 1)[0];
    resultArr.push(randomElement);
  }
  return resultArr;
};

/**
 * Функция склонения слов после числа
 * @param {number} n число перед словом
 * @param {array} words массив с вариантами слов
 * @returns {string} полученное слово в зависимости от числа
 */
const changeWordsFormat = (n, words) => {
  n = Math.abs(n) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return words[2];
  if (n1 > 1 && n1 < 5) return words[1];
  if (n1 === 1) return words[0];
  return words[2];
}

/**
 * Функция проверки нажатия клавиши "Esc"
 * @param {object} evt объект события
 * @param {object} action функция
 */
const isEscEvent = (evt, action) => {
  if (evt.keyCode === keyCodes.ESC) {
    action()
  }
}

/**
 * Функция проверки нажатия клавиши "Enter"
 * @param {object} evt объект события
 * @param {object} action функция
 */
const isEnterEvent = (evt, action) => {
  if (evt.keyCode === keyCodes.ENTER) {
    action()
  }
}

export {
  getRandomNubmerFromRange,
  getRandomFloatNubmerFromRange,
  getRandomElementFromArray,
  getRandomLenghtArray,
  changeWordsFormat,
  isEscEvent,
  isEnterEvent
};

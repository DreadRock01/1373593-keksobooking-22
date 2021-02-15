/**
 * Функция получения случайного целого числа из переданного диапазона включительно
 * @param {number} min — минимальное значение
 * @param {number} max — максимальное значение
 * @returns {number} — случайное число
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
 * @param {number} min — минимальное значение
 * @param {number} max — максимальное значение
 * @param {number} n — количество знаков после запятой
 * @returns {number} — случайное число
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
 * @param {array} arr — массив
 * @returns {string} — случайный элемент массива
 */
const getRandomElementFromArray = (arr) => {
  return arr[getRandomNubmerFromRange(0, arr.length - 1)];
};

/**
 * Функция получения массива случайной длины без повторений
 * @param  {array} arr — массив
 * @returns {array} — массив случайной длины
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

export {
  getRandomNubmerFromRange,
  getRandomFloatNubmerFromRange,
  getRandomElementFromArray,
  getRandomLenghtArray
};

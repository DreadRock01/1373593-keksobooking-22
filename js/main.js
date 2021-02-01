'use strict';

/**
 * Функция получения случайного целого числа из переданного диапазона включительно
 * @param {number} min — минимальное значение
 * @param {number} max — максимальное значение
 * @returns {number} — случайное число
 */
const generateRandomNubmerFromRange = (min, max) => {
  if (min >= 0 && max > 0 && max > min) {
    let randomNumber = min + Math.random() * (max - min + 1);
    return Math.floor(randomNumber);
  }
  return 'Ошибка. Диапазон может быть только положительным';
}

generateRandomNubmerFromRange(4, 13);


/**
 * Функция получения случайного дробного числа из переданного диапазона включительно
 * @param {number} min — минимальное значение
 * @param {number} max — максимальное значение
 * @param {number} n - количество знаков после запятой
 * @returns {number} — случайное число
 */
const generateRandomFloatNubmerFromRange = (min, max, n = 1) => {
  if (min >= 0 && max > 0 && max > min) {
    let randomNumber = min + Math.random() * (max - min);
    return randomNumber.toFixed(n);
  }
  return 'Ошибка. Диапазон может быть только положительным';
}

generateRandomFloatNubmerFromRange(1.4, 5.1);


//Inspired by https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//            https://learn.javascript.ru/logical-operators

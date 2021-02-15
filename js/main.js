'use strict';

const CARDS_COUNT = 10;

const TITLES = [
  'Дворец',
  'Квартира',
  'Дом',
  'Бунгало',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECK_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Довольно-таки неплохо',
  'Достаточно уютно',
  'Отличный выбор',
  'Выгодно и за низкую цену',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

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
const getRandomArrayElement = (arr) => {
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

/**
 * Функция создания карточки объекта
 * @returns {object} — объект
 */
const createCard = () => {
  const locationX = getRandomFloatNubmerFromRange(35.65000, 35.70000, 5);
  const locationY = getRandomFloatNubmerFromRange(139.70000, 139.80000, 5);
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomNubmerFromRange(1, 8) + '.png', // это случайное число от 1 до 8 с ведущим нулём.
    },
    offer: {
      title: getRandomArrayElement(TITLES), // строка — заголовок предложения.
      adress: locationX + ', ' + locationY, // строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске
      price: getRandomNubmerFromRange(10, 5000), // число — стоимость. Любое положительное число.
      type: getRandomArrayElement(TYPES), // строка — одно из четырёх фиксированных значений.
      rooms: getRandomNubmerFromRange(2, 10), // число — количество комнат. Любое положительное число.
      guests: getRandomNubmerFromRange(1, 15), // число — количество гостей, которое можно разместить. Любое положительное число.
      checkin: getRandomArrayElement(CHECK_TIMES), // строка — одно из трёх фиксированных значений.
      checkout: getRandomArrayElement(CHECK_TIMES), // строка — одно из трёх фиксированных значений.
      features: getRandomLenghtArray(FEATURES), // массив строк — массив случайной длины из значений/
      description: getRandomArrayElement(DESCRIPTIONS), // строка — описание помещения.
      photos: getRandomLenghtArray(PHOTOS), // массив строк — массив случайной длины из значений.
    },
    location: {
      x: locationX, // число с плавающей точкой
      y: locationY, // число с плавающей точкой
    },
  };
};

const similarCards = new Array(CARDS_COUNT).fill(null).map(() => createCard());

console.log(similarCards);

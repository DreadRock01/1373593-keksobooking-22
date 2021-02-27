import {
  getRandomNubmerFromRange,
  getRandomFloatNubmerFromRange,
  getRandomElementFromArray,
  getRandomLenghtArray
} from './util.js';

const CARDS_COUNT = 10;

const Coords = {
  MIN_X: 35.65000,
  MAX_X: 35.70000,
  MIN_Y: 139.70000,
  MAX_Y: 139.80000,
};

const TITLES = [
  'Сдается отличное жилье',
  'Сдается отличное жилье',
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
 * Функция создания карточки объекта
 * @returns {object} — объект
 */
const createAd = () => {
  const locationX = getRandomFloatNubmerFromRange(Coords.MIN_X, Coords.MAX_X, 5);
  const locationY = getRandomFloatNubmerFromRange(Coords.MIN_Y, Coords.MAX_Y, 5);
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomNubmerFromRange(1, 8) + '.png', // это случайное число от 1 до 8 с ведущим нулём.
    },
    offer: {
      title: getRandomElementFromArray(TITLES), // строка — заголовок предложения.
      address: locationX + ', ' + locationY, // строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске
      price: getRandomNubmerFromRange(10, 5000), // число — стоимость. Любое положительное число.
      type: getRandomElementFromArray(TYPES), // строка — одно из четырёх фиксированных значений.
      rooms: getRandomNubmerFromRange(1, 10), // число — количество комнат. Любое положительное число.
      guests: getRandomNubmerFromRange(1, 15), // число — количество гостей, которое можно разместить. Любое положительное число.
      checkin: getRandomElementFromArray(CHECK_TIMES), // строка — одно из трёх фиксированных значений.
      checkout: getRandomElementFromArray(CHECK_TIMES), // строка — одно из трёх фиксированных значений.
      features: getRandomLenghtArray(FEATURES), // массив строк — массив случайной длины из значений/
      description: getRandomElementFromArray(DESCRIPTIONS), // строка — описание помещения.
      photos: getRandomLenghtArray(PHOTOS), // массив строк — массив случайной длины из значений.
    },
    location: {
      x: locationX, // число с плавающей точкой
      y: locationY, // число с плавающей точкой
    },
  };
};

/**
 * Функция генерации массива объектов похожих объявлений
 * @param  {number} quantity // количество элементов массива
 * @returns  {array} // массив объектов похожих объявлений
 */
const createSimilarAds = (quantity) => {
  let cardsList = [];
  for (let i = 0; i < quantity; i++) {
    cardsList.push(createAd());
  }
  return cardsList;
}

export {
  CARDS_COUNT,
  createSimilarAds
};

/* global _:readonly */
import {
  renderPins,
  removeMarkers
} from './map.js';

const OFFERS_LIMIT = 10;

const DELAY_TIMER = 500;

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');

const priceLength = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: Infinity,
  },
};

/**
 * Функция-шаблон для фильтрации форм
 * @param {object} element элемент фильтрации
 * @param {object} position селект
 * @param {object} filterType тип фильтруемых элементов
 * @returns {object} результат сравнивания значения объявления с выбранным селектом в фильтре
 */
const filteringItem = (element, position, filterType) => {
  if (position.value === 'any') {
    return true;
  }
  return element.offer[filterType].toString() === position.value;
};

/**
 * Функция фильтрации по параметрам жилья
 * @param {object} element элемент фильтрации
 * @returns {object} массив выбранных элементов
 */
const filterByHousingParams = (element) => {
  return filteringItem(element, housingType, 'type')  && filteringItem(element, housingRooms, 'rooms') && filteringItem(element, housingGuests, 'guests');
};

/**
 * Функция фильтрации по цене
 * @param {object} element элемент фильтрации
 * @returns {*} проверка стоимости
 */
const filterByPrice = (element) => {
  const filteringPrice = priceLength[housingPrice.value];
  if (housingPrice.value === 'any') {
    return true
  }
  return element.offer.price >= filteringPrice.min && element.offer.price <= filteringPrice.max;
};

/**
 * Функция фильтрации по преимуществам
 * @param {object} element элемент фильтрации
 * @returns {object} массив чекнутых элементов
 * @returns {boolean} результат проверки условия
 */
const filterByFeatures = (element) => {
  const checkedFeatures = housingFeatures.querySelectorAll('input:checked');
  return Array.from(checkedFeatures).every((item) => {
    return element.offer.features.includes(item.value);
  });
};

/**
 * Функция фильтрации объявлений
 * @param {object} filteredAnnouncements массив отфильтрованных элементов
 */
const filterAds = (filteredAnnouncements) => {
  mapFilters.addEventListener('change', _.debounce(() => {
    const sameAnnouncements = filteredAnnouncements
      .filter(filterByHousingParams)
      .filter(filterByPrice)
      .filter(filterByFeatures)
    removeMarkers();
    renderPins(sameAnnouncements.slice(0, OFFERS_LIMIT));
  }, DELAY_TIMER));
};
export {
  OFFERS_LIMIT,
  filterAds
};

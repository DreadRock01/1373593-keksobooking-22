import {
  changeWordsFormat
} from './util.js';

const ROOMS = [
  'комната',
  'комнаты',
  'комнат',
];

const GUESTS = [
  'гостя',
  'гостей',
  'гостей',
];

const ImagesSizes = {
  WIDTH: 45,
  HEIGHT: 40,
};

const offerType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

/**
 * Функция создания списка преимуществ. Если данных не хватает, то блок удаляется.
 * @param {object} list DOM-нода, в которую добавляются фичи
 * @param {object} features объект, содержащий наименования фич
 */
const createFeaturesList = (list, features) => {
  list.textContent = '';
  if (features.length) {
    features.forEach((feature) => {
      let featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature', `popup__feature--${feature}`);
      list.appendChild(featureItem);
    });
  } else {
    list.remove();
  }
};

/**
 * Функция создания списка фото. Если данных не хватает, то блок удаляется.
 * @param {object} list DOM-нода, в которую добавляются фото
 * @param {object} images объект, содержащий src фото
 */
const createImagesList = (list, images) => {
  list.textContent = '';
  if (images.length) {
    images.forEach((image) => {
      let imageItem = document.createElement('img');
      imageItem.src = image;
      imageItem.classList.add('popup__photo');
      imageItem.style.width = `${ImagesSizes.WIDTH}px`;
      imageItem.style.height = `${ImagesSizes.HEIGHT}px`;
      list.appendChild(imageItem);
    });
  } else {
    list.remove();
  }
};

/**
 * Функция показа карточки
 * @param {object} author объект с информацией об авторе
 * @param {object} offer объект с информацией о предложении
 * @returns {object} возвращает раметку объявления
 */
const renderCard = ({author, offer}) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  const featuresList = cardElement.querySelector('.popup__features');
  const imagesList = cardElement.querySelector('.popup__photos');

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = offerType[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${changeWordsFormat(offer.rooms, ROOMS)} для ${offer.guests} ${changeWordsFormat(offer.guests, GUESTS)}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  createFeaturesList(featuresList, offer.features);
  createImagesList(imagesList, offer.photos);
  return cardElement;
};

export {
  renderCard
};

import {
  CARDS_COUNT,
  createSimilarAds
} from './data.js';

import {
  changeWordsFormat
} from './util.js';

const offerType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

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

const imagesSizes = {
  WIDTH: 45,
  HEIGHT: 40,
};

const cardsOnCanvas = document.querySelector('#map-canvas');
const similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createSimilarCards = (renderAd) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  const featuresList = cardElement.querySelector('.popup__features');
  const imagesList = cardElement.querySelector('.popup__photos');

  const createFeaturesList = () => { // функция для создания списка преимуществ
    featuresList.textContent = '';
    for (let i = 0; i < renderAd.offer.features.length; i++) {
      let featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature', `popup__feature--${renderAd.offer.features[i]}`);
      featuresList.appendChild(featureItem);
    }
  };

  const createImagesList = () => { // функция для создания списка фото
    imagesList.textContent = '';
    for (let i = 0; i < renderAd.offer.photos.length; i++) {
      let imageItem = document.createElement('img');
      imageItem.src = renderAd.offer.photos[i];
      imageItem.classList.add('popup__photo'); // отступы
      imageItem.style.width = `${imagesSizes.WIDTH}px`;
      imageItem.style.height = `${imagesSizes.HEIGHT}px`;
      imagesList.appendChild(imageItem);
    }
  };

  cardElement.querySelector('.popup__title').textContent = renderAd.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = renderAd.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${renderAd.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = offerType[renderAd.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${renderAd.offer.rooms} ${changeWordsFormat(renderAd.offer.rooms, ROOMS)} для ${renderAd.offer.guests} ${changeWordsFormat(renderAd.offer.guests, GUESTS)}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${renderAd.offer.checkin}, выезд до ${renderAd.offer.checkout}`;
  cardElement.querySelector('.popup__description').textContent = renderAd.offer.description;
  cardElement.querySelector('.popup__avatar').src = renderAd.author.avatar;
  if (renderAd.offer.features.length) {
    createFeaturesList();
  }
  if (renderAd.offer.photos.length) {
    createImagesList();
  }
  return cardElement;
};

let similarAds = createSimilarAds(CARDS_COUNT);
let similarCards = createSimilarCards(similarAds[0]);

cardsOnCanvas.appendChild(similarCards);

import {
  changeWordsFormat
} from './util.js';

import './data.js';

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

const similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createCard = (renderAd) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  const featuresList = cardElement.querySelector('.popup__features');
  const imagesList = cardElement.querySelector('.popup__photos');

  /**
   * Функция создания списка преимуществ. Если данных не хватает, то блок удаляется.
   */
  const createFeaturesList = () => {
    featuresList.textContent = '';
    const features = renderAd.offer.features;
    if (features.length) {
      features.forEach((feature, i) => {
        let featureItem = document.createElement('li');
        featureItem.classList.add('popup__feature', `popup__feature--${features[i]}`);
        featuresList.appendChild(featureItem);
      });
    } else {
      featuresList.remove();
    }
  };

  /**
   * Функция создания списка фото. Если данных не хватает, то блок удаляется.
   */
  const createImagesList = () => {
    imagesList.textContent = '';
    const images = renderAd.offer.photos;
    if (images.length) {
      images.forEach((image, i) => {
        let imageItem = document.createElement('img');
        imageItem.src = images[i];
        imageItem.classList.add('popup__photo');
        imageItem.style.width = `${imagesSizes.WIDTH}px`;
        imageItem.style.height = `${imagesSizes.HEIGHT}px`;
        imagesList.appendChild(imageItem);
      });
    } else {
      imagesList.remove();
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
  createFeaturesList();
  createImagesList();
  return cardElement;
};

export {
  createCard
};

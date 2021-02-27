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

const createCard = (renderAd) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  const featuresList = cardElement.querySelector('.popup__features');
  const imagesList = cardElement.querySelector('.popup__photos');

  const createFeaturesList = () => { // функция для создания списка преимуществ, если данных не хватает, то блок удаляется. (чекни слак, я хотел уточнить насчет этого)
    featuresList.textContent = '';
    const features = renderAd.offer.features;
    if (features.length) {
      renderAd.offer.features.forEach((item, i) => {
        let featureItem = document.createElement('li');
        featureItem.classList.add('popup__feature', `popup__feature--${renderAd.offer.features[i]}`);
        featuresList.appendChild(featureItem);
      });
    } else {
      featuresList.remove();
    }
  };

  const createImagesList = () => { // функция для создания списка фото, если данных не хватает, то блок удаляется.
    imagesList.textContent = '';
    const images = renderAd.offer.photos;
    if (images.length) {
      renderAd.offer.photos.forEach((item, i) => {
        let imageItem = document.createElement('img');
        imageItem.src = renderAd.offer.photos[i];
        imageItem.classList.add('popup__photo'); // отступы
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
  cardsOnCanvas,
  createCard
};

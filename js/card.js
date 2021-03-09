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

const similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const renderCard = ({author, offer}) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  const featuresList = cardElement.querySelector('.popup__features');
  const imagesList = cardElement.querySelector('.popup__photos');

  /**
   * Функция создания списка преимуществ. Если данных не хватает, то блок удаляется.
   */
  const createFeaturesList = () => {  // стоит ли параметризировать, если функции завернуты под блок renderCard? и завязаны на определенных дом нодах (featuresList, imagesList)
    featuresList.textContent = '';
    const features = offer.features;
    if (features.length) {
      features.forEach((feature) => {
        let featureItem = document.createElement('li');
        featureItem.classList.add('popup__feature', `popup__feature--${feature}`);
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
    const images = offer.photos;
    if (images.length) {
      images.forEach((image) => {
        let imageItem = document.createElement('img');
        imageItem.src = image;
        imageItem.classList.add('popup__photo');
        imageItem.style.width = `${imagesSizes.WIDTH}px`;
        imageItem.style.height = `${imagesSizes.HEIGHT}px`;
        imagesList.appendChild(imageItem);
      });
    } else {
      imagesList.remove();
    }
  };

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = offerType[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${changeWordsFormat(offer.rooms, ROOMS)} для ${offer.guests} ${changeWordsFormat(offer.guests, GUESTS)}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  createFeaturesList();
  createImagesList();
  return cardElement;
};

export {
  renderCard
};

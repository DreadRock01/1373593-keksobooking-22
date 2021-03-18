/* global L:readonly */
import {
  setFormState
} from './form.js';

import {
  renderCard
} from './card.js'

const ERR_SHOW_TIME = 5000;

const addressField = document.querySelector('#address');

const defaultCoords = {
  lat: 35.65850,
  lng: 139.78000,
}

const map = L.map('map-canvas')
  .on('load', () => {
    setFormState(true);
  })
  .setView({
    lat: defaultCoords.lat,
    lng: defaultCoords.lng,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: defaultCoords.lat,
    lng: defaultCoords.lng,
  }, {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainMarker.addTo(map);
addressField.setAttribute('readonly', true);
addressField.value = `${defaultCoords.lat.toFixed(5)}, ${defaultCoords.lng.toFixed(5)}`;

/**
 * Функция отображения координат в строке "Адрес", в зависимости от положения основной метки
 */
mainMarker.on('move', (evt) => {
  let markerCoords = evt.target.getLatLng();
  addressField.value = `${markerCoords.lat.toFixed(5)}, ${markerCoords.lng.toFixed(5)}`;
});

/**
 * Функция создания 10 рандомных меток по шаблону
 */
const renderPins = (pins) => {
  pins.forEach(({author, offer, location}) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(
        renderCard({author, offer}), {
          keepInView: true,
        },
      );
  });
};

/**
 * Функция показа ошибки на карте при загрузке данных объявлений
 * @param {string} err текст ошибки
 */
const showErrorGetData = (err) => {
  const mapContainer = document.querySelector('.map');
  const errorContainer = document.createElement('div');

  errorContainer.style.zIndex = 1000;
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = 0;
  errorContainer.style.top = 0;
  errorContainer.style.right = 0;
  errorContainer.style.padding = '14px 5px';
  errorContainer.style.fontSize = '18px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.color = 'white';
  errorContainer.style.backgroundColor = 'red';

  errorContainer.textContent = err;

  mapContainer.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, ERR_SHOW_TIME);
};

/**
 * Функция возврата карты, метки и ее координат к исходному состоянию
 */
const resetMap = () => {
  addressField.value = `${defaultCoords.lat}, ${defaultCoords.lng}`;
  mainMarker.setLatLng([defaultCoords.lat, defaultCoords.lng]);
  map.setView({
    lat: defaultCoords.lat,
    lng: defaultCoords.lng,
  }, 10);
}

export {
  showErrorGetData,
  resetMap,
  renderPins
};

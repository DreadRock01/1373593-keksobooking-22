/* global L:readonly */
import {
  setFormState
} from './form.js';

import {
  renderCard
} from './card.js'

import {
  showErrorGetData
} from './util.js'

const DEF_ZOOM = 10;
const ACT_DELAY = 100;
const STEP_SIZE = 5;

const addressField = document.querySelector('#address');

const defaultCoords = {
  lat: 35.65850,
  lng: 139.78000,
}

const addressFieldValue = () => {
  return addressField.value = `${defaultCoords.lat.toFixed(STEP_SIZE)}, ${defaultCoords.lng.toFixed(STEP_SIZE)}`;
}

const map = L.map('map-canvas')
  .on('load', () => {
    setFormState(true);
    addressField.setAttribute('readonly', true);
    addressFieldValue();
  })
  .setView(defaultCoords, DEF_ZOOM);

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

/**
 * Функция отображения координат в строке "Адрес", в зависимости от положения основной метки
 */
mainMarker.on('move', (evt) => {
  let markerCoords = evt.target.getLatLng();
  addressField.value = `${markerCoords.lat.toFixed(STEP_SIZE)}, ${markerCoords.lng.toFixed(STEP_SIZE)}`;
});

const markersGroup = L.layerGroup();

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

/**
 * Функция создания 10 рандомных меток по шаблону
 */
const renderPins = (pins) => {
  markersGroup.clearLayers();
  pins.forEach(({author, offer, location}) => {
    const marker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: pinIcon,
      },
    );

    marker
      .addTo(markersGroup)
      .bindPopup(
        renderCard({author, offer}), {
          keepInView: true,
        },
      );
  });
  markersGroup.addTo(map);
};

const removeMarkers = () => {
  markersGroup.remove();
};

/**
 * Функция возврата карты, метки и ее координат к исходному состоянию
 */
const resetMap = () => {
  setTimeout(() => {
    addressFieldValue(); // х3, пока не знаю че делать)
  }, ACT_DELAY);
  mainMarker.setLatLng([defaultCoords.lat, defaultCoords.lng]);
  map.setView(defaultCoords, DEF_ZOOM);
  removeMarkers();
  markersGroup.addTo(map);
}

export {
  showErrorGetData,
  resetMap,
  renderPins,
  removeMarkers
};

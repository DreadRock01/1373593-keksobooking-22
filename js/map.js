/* global L:readonly */
import {
  setFormEnabled
} from './form.js';

import {
  similarAds
} from './data.js';

import {
  createCard
} from './card.js'

const addressField = document.querySelector('#address');

const defaultCoords = {
  lat: 35.65850,
  lng: 139.78000,
}

const map = L.map('map-canvas')
  .on('load', () => {
    setFormEnabled();
  })
  .setView({
    lat: defaultCoords.lat,
    lng: defaultCoords.lng,
  }, 12);

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
mainMarker.on('moveend', (evt) => {
  let markerCoords = evt.target.getLatLng();
  addressField.value = `${markerCoords.lat.toFixed(5)}, ${markerCoords.lng.toFixed(5)}`;
});

/**
 * Функция создания 10 рандомных меток по шаблону
 */
similarAds.forEach(({author, offer, location}) => {
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat: location.x,
      lng: location.y,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(
      createCard({author, offer}),
      {
        keepInView: true,
      },
    );
});

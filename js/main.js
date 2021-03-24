import './validation.js';

import './photo.js'

import {
  getData
} from './fetch.js'

import {
  renderPins
} from './map.js';

import {
  setActionForm,
  setFormReset
} from './form.js';

import {
  filterAds
} from './filter.js';

const OFFERS_LIMIT = 10;

getData((data) => {
  renderPins(data.slice(0, OFFERS_LIMIT));
  filterAds(data)
  setFormReset(data.slice(0, OFFERS_LIMIT));
  setActionForm(data.slice(0, OFFERS_LIMIT));
});

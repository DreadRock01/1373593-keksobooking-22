import './validation.js';

import './photo.js'

import {
  getData
} from './fetch.js'

import {
  renderPins
} from './map.js';

import {
  setActionForm
} from './form.js';

import {
  filteringAds
} from './filter.js';


const OFFERS_LIMIT = 10;

getData((data) => {
  renderPins(data.slice(0, OFFERS_LIMIT));
  filteringAds(data.slice(0, OFFERS_LIMIT));
  setActionForm();
});

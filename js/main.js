import {
  getData
} from './fetch.js'

import {
  renderPins
} from './map.js';

// import {
//   submitForm
// } from './form.js';

import './validation.js';

getData(
  (data) => renderPins(data),
);

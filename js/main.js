import {
  CARDS_COUNT,
  createSimilarAds
} from './data.js';

import {
  createCard,
  cardsOnCanvas
} from './card.js';

import './form.js';

let similarAds = createSimilarAds(CARDS_COUNT);
let similarCards = createCard(similarAds[0]);

cardsOnCanvas.appendChild(similarCards);

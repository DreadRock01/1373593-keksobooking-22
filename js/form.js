const minPriceOfRent = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

// const mapFilter = document.querySelectorAll('.map__filter');
// const mapFeatures = document.querySelector('.map__features');
const housingType = document.querySelector('#type');
const pricePerNight = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

housingType.addEventListener('change', (evt) => {
  pricePerNight.min = pricePerNight.placeholder = minPriceOfRent[evt.target.value];
  // alert(`evt.type ${'на'} evt.currentTarget`);
})

timeIn.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
})

timeOut.addEventListener('change', (evt) => {
  timeIn.value = evt.target.value;
})

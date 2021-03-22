const MAX_PRICE = 1000000;

const minPriceOfRent = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const housingType = document.querySelector('#type');
const pricePerNight = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const formTitle = document.querySelector('#title');
const roomNumberSelect = document.querySelector('#room_number');
const capacityElements = document.querySelector('#capacity');
const capacityVariants = capacityElements.querySelectorAll('option');
const roomsValues = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

housingType.addEventListener('change', (evt) => {
  pricePerNight.min = pricePerNight.placeholder = minPriceOfRent[evt.target.value];
})

timeIn.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
})

timeOut.addEventListener('change', (evt) => {
  timeIn.value = evt.target.value;
})


/**
 * Функция валидации заголовка
 */
formTitle.addEventListener('invalid', () => {
  if (formTitle.validity.tooShort) {
    formTitle.setCustomValidity('Текст заголовка должен состоять минимум из 30-ти символов');
  } else if (formTitle.validity.tooLong) {
    formTitle.setCustomValidity('Текст заголовка не должен превышать 100 символов');
  } else if (formTitle.validity.valueMissing) {
    formTitle.setCustomValidity('Обязательное поле');
  } else {
    formTitle.setCustomValidity('');
  }
});

/**
 * Функция валидации цены
 */
pricePerNight.addEventListener('input', () => {
  let typeValue = housingType.value;
  let minPrice = minPriceOfRent[typeValue];
  if (pricePerNight.value < minPrice) {
    pricePerNight.setCustomValidity(`Цена должна быть не менее ${minPrice} руб.`);
  } else if (pricePerNight.value > MAX_PRICE) {
    pricePerNight.setCustomValidity(`Цена за жилье не может превышать ${MAX_PRICE} руб.`);
  } else {
    pricePerNight.setCustomValidity('');
  }
  pricePerNight.reportValidity();
});

/**
 * Функция блокировки опций под первоначальное состояние элементов
 */
capacityVariants.forEach((option) => {
  option.disabled = true;
});
capacityVariants[2].disabled = false;

/**
 * Функция валидации кол-во комнат - кол-во мест
 */
roomNumberSelect.addEventListener('change', (evt) => {
  let roomValue = evt.target.value;
  capacityVariants.forEach((option) => {
    if (roomsValues[roomValue].includes(+option.value)) {
      option.disabled = false;
      option.selected = true;
    } else {
      option.disabled = true;
    }
  });
});

const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
console.log(popupOpenButtonElement);

const openPopup = function () {
popupElement.classList.add('popup__opened');
};

const closePopup = function () {
    popupElement.classList.remove('popup__opened');
    };

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

/*togglePopupVisibility();*/

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input');
let jobInput = formElement.querySelector('.popup__input-two');
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle')

popupOpenButtonElement.addEventListener('click', function () {
    openPopup();
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
  });

function handleFormSubmit (evt) {
    evt.preventDefault();
    nameInput.value;
    jobInput.value;

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
};

formElement.addEventListener('submit', handleFormSubmit);
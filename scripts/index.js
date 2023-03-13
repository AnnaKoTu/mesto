const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const openPopup = function () {
popupElement.classList.add('popup_opened');
};

const closePopup = function () {
    popupElement.classList.remove('popup_opened');
    };

popupCloseButtonElement.addEventListener('click', closePopup);

/*togglePopupVisibility();*/

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
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

    closePopup();
};

formElement.addEventListener('submit', handleFormSubmit);
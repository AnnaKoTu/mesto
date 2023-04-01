//Шесть карточек из коробки
const initialCards = [
    {
        name: 'Бодрум',
        link: 'https://images.unsplash.com/photo-1632424165281-bcc2ca358a81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80'
    },
    {
        name: 'Стамбул',
        link: 'https://images.unsplash.com/photo-1637063357740-7372cb058332?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        name: 'Анталья',
        link: 'https://images.unsplash.com/photo-1668606740315-ca13d336d231?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        name: 'Кападокия',
        link: 'https://images.unsplash.com/photo-1526048598645-62b31f82b8f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        name: 'Измир',
        link: 'https://images.unsplash.com/photo-1604844797738-bb287fc5aed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
    },
    {
        name: 'Анкара',
        link: 'https://images.unsplash.com/photo-1578852952104-54f3dac8b260?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80'
    }
];

const cardsElement = document.querySelector('.elements');

function createCard(card) {
    const cardTemplate = document.querySelector('.element__template').content.cloneNode(true);

    const elementImg = cardTemplate.querySelector('.element__image');
    elementImg.setAttribute('src', card.link);
    elementImg.setAttribute('alt', card.name);

    const elementText = cardTemplate.querySelector('.element__title');
    elementText.textContent = card.name;

    return cardTemplate;
}

initialCards.forEach(card => {
    const newCard = createCard(card);
    cardsElement.append(newCard);
});

//Добавление карточки

function createMesto(event) {
    event.preventDefault();

    const cardNameInput = document.querySelector('.popup__input_text_name');
    const cardLinkInput = document.querySelector('.popup__input_link');
    const newCard = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };

    closePopupCards();
    const newCreateCard = createCard(newCard);
    cardsElement.prepend(newCreateCard);

    cardNameInput.value = '';
    cardLinkInput.value = '';

    return newCreateCard;
}

//Попап редактирования инфо
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

let saveButton = document.querySelector('.popup__submit-card')
saveButton.addEventListener('click', createMesto);

function handleSubmit(evt) {
    evt.preventDefault();
    nameInput.value;
    jobInput.value;

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closePopup();
};

const cardclone = (card => {
    const newCreateCard = handleSubmit(card)
    cardsElement.prepend(newCreateCard)
})

//Открытие попапа "Новое место"

const profileAddButton = document.querySelector('.profile__add-button');
const popupCards = document.querySelector('.popup_cards');
const popupForm = document.querySelector('.popup__form');
const popupCloseButton = popupCards.querySelector('.popup__close_card');

const openPopupCards = function () {
    popupCards.classList.add('popup_opened');
};

const closePopupCards = function () {
    popupCards.classList.remove('popup_opened');
};

profileAddButton.addEventListener('click', openPopupCards);
popupCloseButton.addEventListener('click', closePopupCards);

// Удаление карточки
const deleteButtons = document.querySelectorAll('.element__delete-button');

deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const element = event.target.closest('.element');
        element.remove();
    });
});

// Кнопка like
const likeBtns = document.querySelectorAll('.element__like-button');

likeBtns.forEach(likeBtn => {
    likeBtn.addEventListener('click', function (evt) {
        console.log(evt);
        evt.target.classList.toggle('element__like-button_active');
    });
});

//Форма открытия карточки
document.addEventListener('DOMContentLoaded', function () {
    const openCard = document.querySelector('#openCard');
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');
    const popupCloseBtn = openCard.querySelector('.popup__close');
    const imagePopupOpenBtns = document.querySelectorAll('.element__image');

    function openPopupCard(evt) {
        openCard.classList.add('popup_opened');
        const imagePopupOpenBtn = evt.target;
        popupImage.src = imagePopupOpenBtn.src;
        popupImage.alt = imagePopupOpenBtn.alt;
        popupCaption.textContent = imagePopupOpenBtn.parentNode.querySelector('.element__title').textContent;
    }

    const closePopupCard = function () {
        openCard.classList.remove('popup_opened');
    };

    imagePopupOpenBtns.forEach(function (imagePopupOpenBtn) {
        imagePopupOpenBtn.addEventListener('click', openPopupCard);
    });
    popupCloseBtn.addEventListener('click', closePopupCard);
});


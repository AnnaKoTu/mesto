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


function createCard(card) {
    const cardTemplate = document.querySelector('.element__template').content.cloneNode(true);

    const elementImg = cardTemplate.querySelector('.element__image');
    elementImg.setAttribute('src', card.link);
    elementImg.setAttribute('alt', card.name);

    const elementText = cardTemplate.querySelector('.element__title');
    elementText.textContent = card.name;

    return cardTemplate;
}


function createNewCard(event) {
    event.preventDefault();

    const cardNameInput = document.querySelector('.popup__input_text_name');
    const cardLinkInput = document.querySelector('.popup__input_link');
    const newCard = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };

    closePopupCards();
    const createdCard = createCard(newCard);
    cardsElement.prepend(createdCard);

    subscribeToOpenImage();
    subscribeToLikeButtons();
    subscribeToDeleteButtons();


    cardNameInput.value = '';
    cardLinkInput.value = '';

    return createdCard;
}


function onLikeButtonClicked(event){
    event.target.classList.toggle('element__like-button_active');
}

function subscribeToLikeButtons(){
    const likeButtons = document.querySelectorAll('.element__like-button');

    likeButtons.forEach(likeBtn => {
        likeBtn.addEventListener('click', onLikeButtonClicked);
    });
}

function subscribeToOpenImage() {
    const openCard = document.querySelector('#openCard');
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');
    const popupCloseBtn = openCard.querySelector('.popup__close');

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

    const imagePopupOpenButtons = document.querySelectorAll('.element__image');
    imagePopupOpenButtons.forEach(function (imagePopupOpenBtn) {
        imagePopupOpenBtn.addEventListener('click', openPopupCard);
    });
    popupCloseBtn.addEventListener('click', closePopupCard);
}

//Форма открытия карточки
document.addEventListener('DOMContentLoaded', subscribeToOpenImage);


function subscribeToDeleteButtons(){
    const deleteButtons = document.querySelectorAll('.element__delete-button');

    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const element = event.target.closest('.element');
            element.remove();
        });
    });
}


const cardsElement = document.querySelector('.elements');
initialCards.forEach(card => {
    const newCard = createCard(card);
    cardsElement.append(newCard);
});


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


let formElement = document.querySelector('.popup__form');

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
saveButton.addEventListener('click', createNewCard);


const profileAddButton = document.querySelector('.profile__add-button');
const popupCards = document.querySelector('.popup_cards');
const popupCloseButton = popupCards.querySelector('.popup__close_card');

function openPopupCards() {
    popupCards.classList.add('popup_opened');
}

function closePopupCards() {
    popupCards.classList.remove('popup_opened');
}

profileAddButton.addEventListener('click', openPopupCards);
popupCloseButton.addEventListener('click', closePopupCards);


subscribeToLikeButtons();
subscribeToDeleteButtons();

const saveProfile = document.querySelector('.popup__submit');
const nameField = document.querySelector('.popup__input_type_name');
const jobField = document.querySelector('.popup__input_type_job');

saveProfile.addEventListener('click', function () {
    document.querySelector('.profile__title').innerHTML = nameField.value;
    document.querySelector('.profile__subtitle').innerHTML = jobField.value;
    closePopup();
})

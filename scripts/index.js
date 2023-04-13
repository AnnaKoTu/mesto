// первый попап
const popupProfile = document.querySelector('#popup-profile')
const popupEditButton = document.querySelector('.profile__edit-button')
const formProfile = popupProfile.querySelector('.popup__form')
const nameInput = formProfile.querySelector('.popup__input_type_name')
const jobInput = formProfile.querySelector('.popup__input_type_job')
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__subtitle')

// второй попап
const popupAdd = document.querySelector('#popupAddCard')
const popupAddButton = document.querySelector('.profile__add-button')
const formAddCard = popupAdd.querySelector("form[name='popup-form-add']")
const titleInput = popupAdd.querySelector(".popup__input_text_name")
const urlInput = popupAdd.querySelector(".popup__input_link")

// Константы для карточек
const elements = document.querySelector(".elements")

// третий попап
const popupWrapImage = document.querySelector('#popup-image')
const popupImage = popupWrapImage.querySelector('.popup__image')
const popupImageTitle = popupWrapImage.querySelector('.popup__caption')

const initialCards = [{
    name: 'Бодрум',
    link: 'https://images.unsplash.com/photo-1632424165281-bcc2ca358a81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80'
}, {
    name: 'Стамбул',
    link: 'https://images.unsplash.com/photo-1637063357740-7372cb058332?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
}, {
    name: 'Анталья',
    link: 'https://images.unsplash.com/photo-1668606740315-ca13d336d231?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
}, {
    name: 'Кападокия',
    link: 'https://images.unsplash.com/photo-1526048598645-62b31f82b8f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
}, {
    name: 'Измир',
    link: 'https://images.unsplash.com/photo-1604844797738-bb287fc5aed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
}, {
    name: 'Анкара',
    link: 'https://images.unsplash.com/photo-1578852952104-54f3dac8b260?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80'
}];


// Функция открытия попапа
const openPopupEdit = function () {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

const openPopupAdd = function () {
    openPopup(popupAdd);
};

const openPopup = popup => {
    popup.classList.add('popup_opened');
}

popupEditButton.addEventListener('click', openPopupEdit);
popupAddButton.addEventListener('click', openPopupAdd);

// Функция закрытия попапа
const closePopup = popup => {
    popup.classList.remove('popup_opened');
}

const popups = document.querySelectorAll('.popup');

popups.forEach(popup => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    });
});

function closePopupKeyEsc (evt) {
    if (evt.key === 'Escape') {
        const keyEsc = document.querySelector('popup__opened');
        closePopup(keyEsc);
    }
};

document.addEventListener('keydown', closePopupKeyEsc);

// Отображение в попапе инпутов
function submitEditProfileForm(event) {
    event.preventDefault();

    let res = writeProfileExceptionsIfNeed();

    if (res.b1 && res.b2) closePopup(popupProfile);
}

//Валидация
function writeProfileNameException(exStr) {
    document.getElementById('name-error').textContent = exStr;
}

function writeProfileJobException(exStr) {
    document.getElementById('job-error').textContent = exStr;
}

formProfile.addEventListener('submit', submitEditProfileForm);


function writeProfileExceptionsIfNeed() {
    let b1 = isValidProfileName(nameInput.value);
    let b2 = isValidProfileContent(jobInput.value);

    if (b1) {
        profileName.textContent = nameInput.value;
        writeProfileNameException('')
    } else writeProfileNameException(nameInput.validationMessage);

    if (b2) {
        profileJob.textContent = jobInput.value;
        writeProfileJobException('')
    } else writeProfileJobException(jobInput.validationMessage);

    return {b1: b1, b2: b2};
}

function validateProfile() {
    let res = writeProfileExceptionsIfNeed();
    if (!res.b1) {
        document.getElementById('save_profile').style.background = '#e5e5e5';
        document.getElementById('name').style.borderBlockColor = 'red';
    } else document.getElementById('name').style.borderBlockColor = 'white';

    if (!res.b2) {
        document.getElementById('save_profile').style.background = '#e5e5e5';
        document.getElementById('userjob').style.borderBlockColor = 'red';
    } else document.getElementById('userjob').style.borderBlockColor = 'white';

    if (res.b1 && res.b2) {
        document.getElementById('save_profile').style.background = '#000000';
    }
}

formProfile.addEventListener('input', validateProfile);

// Добавление карточек
initialCards.forEach(renderCards)

function renderCards(item) {
    const newCard = createCard(item);
    elements.append(newCard);
}

function createCard(item) {
    const template = document.querySelector(".element__template").content
    const cardElement = template.cloneNode(true)
    const likeButton = cardElement.querySelector('.element__like-button')
    const deleteButton = cardElement.querySelector('.element__delete-button')
    const imgElement = cardElement.querySelector('.element__image')

    likeButton.addEventListener('click', () => likeButton.classList.toggle("element__like-button_active"))
    imgElement.src = item.link;
    imgElement.alt = item.name;
    cardElement.querySelector('.element__title').textContent = item.name;
    deleteButton.addEventListener('click', handleDeleteCard)

    imgElement.addEventListener('click', function () {
        openPopup(popupWrapImage);
        popupImage.src = imgElement.src;
        popupImageTitle.textContent = imgElement.alt;
    });

    return cardElement
}

function handleAddCard(event) {
    event.preventDefault();

    let b1 = isValidUrl(urlInput.value);
    let b2 = isValidTitle(titleInput.value);

    if (!b1 || !b2) return;

    const newCard = createCard({
        name: titleInput.value, link: urlInput.value
    })

    elements.prepend(newCard);
    closePopup(popupAdd);
    event.target.reset();
}


function validateCard() {
    let b1 = isValidUrl(urlInput.value);
    let b2 = isValidTitle(titleInput.value);

    if (b1) writeUrlException('')
    else writeUrlException(urlInput.validationMessage);

    if (b2) writeTitleException('')
    else writeTitleException(titleInput.validationMessage);

    if (!b1 || !b2) document.getElementById('create_card').style.background = '#e5e5e5';
    else document.getElementById('create_card').style.background = '#000000';

    /*
    if (!res.b1) {
        document.getElementById('save_profile').style.background = '#e5e5e5';
        document.getElementById('name').style.borderBlockColor = 'red';
    } else document.getElementById('name').style.borderBlockColor = 'white';

    if (!res.b2) {
        document.getElementById('save_profile').style.background = '#e5e5e5';
        document.getElementById('userjob').style.borderBlockColor = 'red';
    } else document.getElementById('userjob').style.borderBlockColor = 'white';

    if (res.b1 && res.b2) {
        document.getElementById('save_profile').style.background = '#000000';
    }
    */
}


function writeUrlException(exStr) {
    document.getElementById('link-error').textContent = exStr;

    if (exStr !== '') document.getElementById('card_url').style.borderBlockColor = "red";
    else document.getElementById('card_url').style.borderBlockColor = "white";
}

function writeTitleException(exStr) {
    document.getElementById('input-error').textContent = exStr;

    if (exStr !== '') document.getElementById('card_name').style.borderBlockColor = "red";
    else document.getElementById('card_name').style.borderBlockColor = "white";
}

// Удаление карточки
function handleDeleteCard(event) {
    const card = event.target.closest('.element');
    card.remove();
}

// Закрытие
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

formAddCard.addEventListener('submit', handleAddCard);
formAddCard.addEventListener('input', validateCard);

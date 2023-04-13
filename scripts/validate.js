enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__button_disabled',
    /*inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'*/
});

const enableValidation = ({formSelector, ...rest}) => {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach(form => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault()
        })
        setEventListeners(form, rest)
    })
};

const setEventListeners = (formToValidate, {inputSelector, submitButtonSelector, ...rest}) => {
    const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector));
    const formButton = formToValidate.querySelector(submitButtonSelector);
    disableButton(formButton, rest);
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(input)
            if (hasInvalidInput(formInputs)) {
                disableButton(formButton, rest)
            } else {
                enableButton(formButton, rest)
            }
        })
    })
}

const checkInputValidity = (input) => {
    const currentInputErrorContainer = document.querySelector(`#${input.id}-error`)
    if (input.checkValidity()) {
        currentInputErrorContainer.textContent = ''
    } else {
        currentInputErrorContainer.textContent = input.validationMessage
    }
}

const hasInvalidInput = (formInputs) => {
    return formInputs.some(item => !item.validity.valid);
}

const enableButton = (button, {inactiveButtonClass, activeBattonClass}) => {
    button.classList.remove(inactiveButtonClass);
    button.classList.add(activeButtonClass);
    button.setAttribute('disabled', true);
}

const disableButton = (button, {inactiveButtonClass, activeBattonClass}) => {
    button.classList.add(inactiveButtonClass);
    button.classList.remove(activeButtonClass);
    button.removeAttribute('disabled');
}

enableValidation(validationConfig);


function isValidProfileName(str) {
    return str.length >= 2 && str.length <= 40;
}

function isValidProfileContent(str) {
    return str.length >= 2 && str.length <= 200;
}

function isValidUrl(urlStr){
    const regex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return regex.test(urlStr);
}

function isValidTitle(str){
    return str.length >= 2 && str.length <= 30;
}
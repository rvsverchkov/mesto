const checkInputValidity = (formElement, inputElement) => {    //Проверка валидности вводимого текста/URL
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
        saveButtons.forEach(function(saveButton) {
            saveButton.classList.add('popup__save_type_disabled');
        });
        formElementEdit.removeEventListener('submit', formSubmitHandlerProfile);
        formElementAdd.removeEventListener('submit', formSubmitHandlerCard);
    } else {
        hideInputError(formElement, inputElement);
        saveButtons.forEach(function(saveButton) {
            saveButton.classList.remove('popup__save_type_disabled');
        });
        formElementEdit.addEventListener('submit', formSubmitHandlerProfile);
        formElementAdd.addEventListener('submit', formSubmitHandlerCard);
    }
};

const setEventListeners = (formElement) => {    //Перебор массива полей ввода с установкой слушателей
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement);
        });
    });
};

const showInputError = (formElement, inputElement, errorMessage) => {   //Показ ошибки при вводе
    const errorItem = formElement.querySelector(`#${inputElement.id}-error`);
    errorItem.textContent = errorMessage;
    inputElement.classList.add('popup__input_type_error');

};

const hideInputError = (formElement, inputElement) => {    //Скрытие сообщения об ошибке при вводе
    const errorItem = formElement.querySelector(`#${inputElement.id}-error`);
    errorItem.textContent = '';
    inputElement.classList.remove('popup__input_type_error');
};

const activateValidation = () => {  //Активация валидации                                      
    const formList = Array.from(document.querySelectorAll('.popup__form'))
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

activateValidation();
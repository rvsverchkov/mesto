const items = { //Вынес валидацию форм в отдельный файл
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_type_disabled',
    inputErrorClass: '.popup__input-error',
    inputTypeError: '.popup__input_type_error'
}; //Создал items в качестве параметра для enableValidation()

const deleteErrors = (items) => { //Создал фукнцию для удаления всех сообщений об невалидности ввода
    const allError = Array.from(document.querySelectorAll(items.inputErrorClass)); //Добавил массив сообщений с ошибками
    allError.forEach((item) => {
        item.textContent = '';
    });
};

const checkInputValidity = (formElement, inputElement, items) => { //Упростил функцию проверки на валидность, чтобы вынести управление состоянием кнопки в другую функцию
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, items);
    } else {
        hideInputError(formElement, inputElement, items);
    }
};

const toggleSubmitButton = (inputList, buttons, items) => { //Создал функцию переключения состояния кнопки
    if (hasInvalidInput(inputList)) { //Вынес управление состоянием кнопки в данную функцию
        buttons.forEach((button) => {
            button.classList.add(items.inactiveButtonClass);
            button.setAttribute('disabled', true);
        });
    } else {
        buttons.forEach((button) => {
            button.classList.remove(items.inactiveButtonClass);
            button.removeAttribute('disabled', true);
        });
    }
};

const hasInvalidInput = (inputList) => { //Добавил проверку на невалидность поля ввода, чтобы управлять состоянием кнопки
    return inputList.some((element) => {
        return !element.validity.valid;
    });
};

const setEventListeners = (formElement, items) => {    //Перебор массива полей ввода с установкой слушателей
    const inputList = Array.from(formElement.querySelectorAll(items.inputSelector));
    const buttons = Array.from(document.querySelectorAll(items.submitButtonSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement, items);
            toggleSubmitButton(inputList, buttons, items);
        });
    });
};

const showInputError = (formElement, inputElement, errorMessage, items) => {   //Показ ошибки при вводе
    const errorItem = formElement.querySelector(`#${inputElement.id}-error`);
    errorItem.textContent = errorMessage;
    inputElement.classList.add(items.inputTypeError);
};

const hideInputError = (formElement, inputElement, items) => {    //Скрытие сообщения об ошибке при вводе
    const errorItem = formElement.querySelector(`#${inputElement.id}-error`);
    errorItem.textContent = '';
    inputElement.classList.remove(items.inputTypeError);
};

const enableValidation = (items) => {  //Активация валидации                                      
    const formList = Array.from(document.querySelectorAll(items.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, items);
    });
};

enableValidation(items); //Добавил параметр функции enableValidation
export class FormValidator {
    constructor(items, form) {
        this._form = form;
        this._formSelector = items.formSelector;
        this._inputSelector = items.inputSelector;
        this._submitButtonSelector = items.submitButtonSelector;
        this._inactiveButtonClass = items.inactiveButtonClass;
        this._inputErrorClass = items.inputErrorClass;
        this._inputTypeError = items.inputTypeError;
        this._buttonList = Array.from(this._form.querySelectorAll(this._submitButtonSelector));
    };

    _setEventListeners() {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._inputList.forEach((item) => {
            item.addEventListener('input', () => {
                this._checkInputValidity(item);
                this._toggleSubmitButton();
                console.log('input');
            });
        });
    };

    _checkInputValidity(inputElement) {
        this._inputElement = inputElement;
        this._errorItem = this._form.querySelector(`#${this._inputElement.id}-error`);
        if (!inputElement.validity.valid) {
            this._showInputError();
        } else {
            this._hideInputError();
        };
    };

    _toggleSubmitButton() {
        this._buttonList = Array.from(this._form.querySelectorAll(this._submitButtonSelector));
        if (this._checkInvalidInput()) {
            this._buttonList.forEach((button) => {
                button.classList.add(this._inactiveButtonClass);
                button.setAttribute('disabled', true);
            });
        } else {
            this._buttonList.forEach((button) => {
                button.classList.remove(this._inactiveButtonClass);
                button.removeAttribute('disabled', true);
            });
        }
    }

    _showInputError() {
        this._errorItem.textContent = this._inputElement.validationMessage;
        this._inputElement.classList.add(this._inputErrorClass);
        this._inputElement.classList.add(this._inputTypeError);
    }

    _hideInputError() {
        this._errorItem.textContent = '';
        this._inputElement.classList.remove(this._inputErrorClass);
        this._inputElement.classList.remove(this._inputTypeError);
    }

    _checkInvalidInput() {
        return this._inputList.some((element) => {
            return !element.validity.valid;
        });
    }

    _enableValidation() {
        this._setEventListeners();
    }
}

/*const buttons = Array.from(document.querySelectorAll('.popup__save'));

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
};*/
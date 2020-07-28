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

    enableValidation() {
        this._setEventListeners();
    }
}
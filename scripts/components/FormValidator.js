export default class FormValidator { //Экспорт класса в index.js
    constructor(items, form) { //Конструктор с селекторами, находящимися в объекте items
        this._form = form;
        this._formSelector = items.formSelector;
        this._inputSelector = items.inputSelector;
        this._submitButtonSelector = items.submitButtonSelector;
        this._inactiveButtonClass = items.inactiveButtonClass;
        this._inputErrorClass = items.inputErrorClass;
        this._inputTypeError = items.inputTypeError;
    };

    _setEventListeners() { //Установка слушателей на все задействованные поля ввода
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector)); //Массив всех полей ввода
        this._inputList.forEach((item) => { //Преборка массива полей ввода
            item.addEventListener('input', () => { //Установка слушателя на событие 'input'
                this._checkInputValidity(item); //Проверка валидности ввода на item
                this._toggleSubmitButton(); //Преключение состояние кнопки ввода формы
            });
        });
    };

    _checkInputValidity(inputElement) { //Проверка валидности вводимых данных
        this._inputElement = inputElement;
        this._errorItem = this._form.querySelector(`#${this._inputElement.id}-error`);
        if (!inputElement.validity.valid) {
            this._showInputError();
        } else {
            this._hideInputError();
        };
    };

    _toggleSubmitButton() { //Переключение состояние кнопки отправки формы
        this._buttonList = Array.from(this._form.querySelectorAll(this._submitButtonSelector)); //Создание массива всех кнопок для отправки формы
        if (this._checkInvalidInput()) { //Проверка на невалидность вводимых данных
            this._buttonList.forEach((button) => { //Переборка массива кнопок
                button.classList.add(this._inactiveButtonClass); //Добавление соответствующего класса каждой из кнопок
                button.setAttribute('disabled', true); //Деактивация кнопки
            });
        } else {
            this._buttonList.forEach((button) => { //Аналогичная переборка массива кнопок
                button.classList.remove(this._inactiveButtonClass); //Удаление класса неактивной кнопки
                button.removeAttribute('disabled', true); //Удаление атрибута с деактивацией
            });
        }
    };

    _showInputError() { //Показ сообщения об ошибке
        this._errorItem.textContent = this._inputElement.validationMessage;
        this._inputElement.classList.add(this._inputErrorClass);
        this._inputElement.classList.add(this._inputTypeError);
    };

    _hideInputError() { //Скрытие сообщения об ошибке
        this._errorItem.textContent = '';
        this._inputElement.classList.remove(this._inputErrorClass);
        this._inputElement.classList.remove(this._inputTypeError);
    };

    hideInputErrors() { //Скрытие всех сообщение об ошибках
        const errorItems = Array.from(this._form.querySelectorAll(this._inputErrorClass));
        errorItems.forEach((error) => {
            error.textContent = '';
        });
    };

    _checkInvalidInput() { //Проверка на невалидность вводимых данных
        return this._inputList.some((element) => {
            return !element.validity.valid;
        });
    };

    enableValidation() { //Активация валидации
        this._setEventListeners();
    };
}
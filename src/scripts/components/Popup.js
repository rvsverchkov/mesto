export default class Popup {
    constructor(popupSelector) { //Конструктор
        this._popup = document.querySelector(`.${popupSelector}`);
        this._popupCloseButton = this._popup.querySelector(`.popup__close`);
        this.setEventListeners();
    }

    open() { //Функция открытия popup'а
        this._popup.classList.add('popup_opened');
        this._createHandleEscCloseListener();
    }

    close() { //Функция закрытия popup'а
        this._removeHandleEscClose();
        this._popup.classList.remove('popup_opened');
        this._removeHandleEscClose();
    }

    _handleOverlayClose() { //Функция закрытия popup'а при нажатии на Overlay
        if (event.target !== event.currentTarget) {
            return
        } else {
            this.close();
        }
    }

    _handleEscClose() { //Функция закрытия popup'а при нажатии на ESC
        if (event.key === 'Escape') {
            this.close();
        }
    }

    _createHandleEscCloseListener() { //Добавление слушателя нажатия на ESC
        document.addEventListener('keydown', (event) => {
            this._handleEscClose(event);
        })
    }

    _removeHandleEscClose() { //Удаление слушателя нажатия на ESC
        document.removeEventListener('keydown', (event) => {
            this._handleEscClose(event);
        })
    }

    setEventListeners() { //Установка всех слушателей на popup и его элементы
        this._popupCloseButton.addEventListener('click', () => {
            this.close();
        })
        this._popup.addEventListener('mousedown', () => {
            this._handleOverlayClose();
        })
    }
}
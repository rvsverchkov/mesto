export default class Popup {
    constructor(popupSelector) { //Конструктор
        this._popup = document.querySelector(`.${popupSelector}`);
        this._popupCloseButton = this._popup.querySelector(`.popup__close`);
        this._handleEscClose = this.handleEscClose.bind(this);
    }

    open() { //Функция открытия popup'а
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose); //FIX: Убрал анонимную функцию
    }

    close() { //Функция закрытия popup'а
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose); //FIX: Убрал анонимную функцию
    }

    _handleOverlayClose() { //Функция закрытия popup'а при нажатии на Overlay
        if (event.target === event.currentTarget) {
            this.close();
        }
    }

    handleEscClose(event) { //Функция закрытия popup'а при нажатии на ESC
        if (event.key === 'Escape') {
            this.close();
        }
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
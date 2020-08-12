export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(`.${popupSelector}`);
        this._popupCloseButton = this._popup.querySelector(`.popup__close`);
        this.setEventListeners();
    }

    open() {
        this._popup.classList.add('popup_opened');
        this._createHandleEscCloseListener();
    }

    close() {
        this._removeHandleEscClose();
        this._popup.classList.remove('popup_opened');
        this._removeHandleEscClose();
    }

    _handleOverlayClose() {
        if (event.target !== event.currentTarget) {
            console.log('target');
            return
        } else {
            this.close();
        }
    }

    _handleEscClose() {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    _createHandleEscCloseListener() {
        document.addEventListener('keydown', (event) => {
            this._handleEscClose(event);
        })
    }

    _removeHandleEscClose() {
        document.removeEventListener('keydown', (event) => {
            this._handleEscClose(event);
        })
    }

    setEventListeners() {
        this._popupCloseButton.addEventListener('click', () => {
            this.close();
        })
        this._popup.addEventListener('click', () => {
        })
        this._popup.addEventListener('mousedown', () => {
            this._handleOverlayClose();
        })
    }
}
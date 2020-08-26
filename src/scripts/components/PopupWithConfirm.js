import Popup from './Popup.js';

export default class PopupWithСonfirm extends Popup {
    constructor(popup, confirm) {
        super(popup);
        this._currentForm = this._popup.querySelector(".popup__form");
        this._confirm = confirm;
    }
    setEventListeners() {
        super.setEventListeners();
        this._currentForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._confirm();
        });
    }
}
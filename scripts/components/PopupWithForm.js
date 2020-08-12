import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popup, {callback}) {
        super(popup);
        this._callbackFunction = callback;
    }

    open() {
        super.open();
        this._currentForm.reset();
    }

    _getInputValues() {
        this._inputValues = [];
        this._inputs = this._currentForm.querySelectorAll('.popup__input');
        this._inputs.forEach((item) => {
            this._inputValues[item.name] = item.value;
        });
        return this._inputValues;
    }

    _submitHandler(event) {
        event.preventDefault();
        this._callbackFunction(this._getInputValues());
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._currentForm = this._popup.querySelector('.popup__form');
        this._currentForm.addEventListener('submit', (event) => {
                this._submitHandler(event);
        });
    }
}
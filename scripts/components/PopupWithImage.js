import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popup, { imageSelector, descriptionSelector}) {
        super(popup);
        this._previewImage = this._popup.querySelector(`.${imageSelector}`);
        this._previewDescription = this._popup.querySelector(`.${descriptionSelector}`);
    }

    open(src, name) {
        super.open();
        this._previewImage.alt = name;
        this._previewImage.src = src;
        this._previewDescription.textContent = name;
    }
}
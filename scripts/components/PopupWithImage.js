import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popup, { imageSelector, descriptionSelector}) {
        super(popup);
        this._previewImage = this._popup.querySelector(`.${imageSelector}`);
        this._previewDescription = this._popup.querySelector(`.${descriptionSelector}`);
    }

    openPreview(alt, src) {
        this._previewImage.alt = alt;
        this._previewImage.src = src;
        this._previewDescription.textContent = alt;
        super.open();
    }
}
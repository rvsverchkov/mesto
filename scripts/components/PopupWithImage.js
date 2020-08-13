import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popup, { imageSelector, descriptionSelector}) { //Конструктор
        super(popup);
        this._previewImage = this._popup.querySelector(`.${imageSelector}`);
        this._previewDescription = this._popup.querySelector(`.${descriptionSelector}`);
    }

    open(src, name) { //Измененная функция открытия popup'а, которая теперь перезаписывает значения alt и src
        super.open();
        this._previewImage.alt = name;
        this._previewImage.src = src;
        this._previewDescription.textContent = name;
    }
}
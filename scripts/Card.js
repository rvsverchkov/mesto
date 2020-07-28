import {closePopup} from './index.js';

export class Card {
    constructor(name, link, selector) {
        this._link = link;
        this._name = name;
        this._template = selector;
    };

    _getTemplate() {
        const cardItem = document
        .querySelector(this._template)
        .content
        .cloneNode(true);
        return cardItem;
    };

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.card__picture').src = this._link;
        this._element.querySelector('.card__text').textContent = this._name;
        this._element.querySelector('.card__picture').alt = this._name;
        this._likeButton = this._element.querySelector('.card__like');
        this._deleteButton = this._element.querySelector('.card__trash');
        this._imageButton = this._element.querySelector('.card__picture');
        this._previewPopup = document.querySelector('.popup_preview');
        this._closeButton = this._previewPopup.querySelector('.popup__close');
        this._setEventListeners();
        return this._element;
    };

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleToggleLike(event);
        });
        this._deleteButton.addEventListener('click', () => {
            this._handleRemoveCard(event);
        });
        this._imageButton.addEventListener('click', () => {
            this._handlePreviewCard(event);
        });
        this._closeButton.addEventListener('click', () => {
            this._previewPopup.classList.remove('popup_opened');
        });
    };

    _handleToggleLike(event) {
        event.target.classList.toggle('card__like_active');
    };

    _handleRemoveCard(event) {
        const currentCard = event.target.closest('.card');
        currentCard.remove();
    };

    _handlePreviewCard(event) {
        this._previewPopup.classList.toggle('popup_opened');
        this._previewPopup.querySelector('.popup__picture').src = event.target.src;
        this._previewPopup.querySelector('.popup__description').textContent = event.target.alt;
        this._closeButton = this._previewPopup.querySelector('.popup__close-preview');
    };

    _handleCloseCard(event) {
        event.target.classList.remove('popup_opened');
    }
};
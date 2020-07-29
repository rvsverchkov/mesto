export class Card { //Экспорт класса Card в index.js
    constructor(name, link, selector) { //Конструктор класса с вводимыми данными
        this._link = link;
        this._name = name;
        this._template = selector;
    };

    _getTemplate() { //Взятие шаблона карточки из .document
        const cardItem = document.querySelector(this._template).content.cloneNode(true);
        return cardItem;
    };

    generateCard() { //Создание самой карточки на основе этого шаблона
        this._element = this._getTemplate(); 
        this._element.querySelector('.card__picture').src = this._link;
        this._element.querySelector('.card__text').textContent = this._name;
        this._element.querySelector('.card__picture').alt = this._name;
        this._likeButton = this._element.querySelector('.card__like');
        this._deleteButton = this._element.querySelector('.card__trash');
        this._imageButton = this._element.querySelector('.card__picture');
        this._previewPopup = document.querySelector('.popup_preview');
        this._closeButton = this._previewPopup.querySelector('.popup__close');
        this._setEventListeners(); //Установка слушателей событий
        return this._element; //Возвращение готовой карточки
    };

    _setEventListeners() { //Установка слушателей событий
        this._likeButton.addEventListener('click', () => { //Слушатель на кнопку like
            this._handleToggleLike(event); //Переключение состояние нажатой кнопки
        });
        this._deleteButton.addEventListener('click', () => { //Слушатель на кнопку delete
            this._handleRemoveCard(event); //Удаление карточки, на которую нажали
        });
        this._imageButton.addEventListener('click', () => { //Слушатель на картинку
            this._handlePreviewCard(event); //Увеличение нажатой картинки
        });
        this._closeButton.addEventListener('click', () => { //Слушатель на кнопку закрытия открытой картинки
            this._previewPopup.classList.remove('popup_opened'); //Удаление класса popup_opened у открытой картинки
        });
    };

    _handleToggleLike(event) { //Преключение состояния кнопки like при нажатии
        event.target.classList.toggle('card__like_active');
    };

    _handleRemoveCard(event) { //Удаление карточки
        const currentCard = event.target.closest('.card');
        currentCard.remove();
    };

    _handlePreviewCard(event) { //Открытие preview нажатой карточки
        this._previewPopup.classList.toggle('popup_opened');
        this._previewPopup.querySelector('.popup__picture').src = event.target.src;
        this._previewPopup.querySelector('.popup__description').textContent = event.target.alt;
        this._closeButton = this._previewPopup.querySelector('.popup__close-preview');
    };

    _handleCloseCard(event) { //Закрытие уже открытой карточки
        event.target.classList.remove('popup_opened');
    }
};
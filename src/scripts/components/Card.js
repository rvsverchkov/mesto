export default class Card { //Экспорт класса Card в index.js
    constructor(currentCard, checkLikeOnCard, deleteCard, selector, id, { handleCardClick }) { //Конструктор класса с вводимыми данными
        this._card = currentCard;
        this._link = currentCard.link;
        this._name = currentCard.name;
        this._template = selector;
        this._handleCardClick = handleCardClick;
        this._deleteCard = deleteCard.bind(this);
        this._currentId = currentCard._id;
        this._owner = currentCard.owner._id;
        this._likesCounter = currentCard.likes;
        this._myId = id;
        this._checkLikeOnCard = checkLikeOnCard.bind(this);
        this._isLikedByMe = this._likesCounter.some((element) => {
            if (element._id === this._myId) {
                return true;
            } else {
                return false;
            }
        })
        this._myCard = this._owner === this._myId;
    };

    getCurrentId() {
        return this._card._id;
    }

    _getTemplate() { //Взятие шаблона карточки из .document
        const cardItem = document.querySelector(this._template).content.cloneNode(true);
        return cardItem;
    };

    generateCard() { //Создание самой карточки на основе этого шаблона
        this._element = this._getTemplate();
        this._picture = this._element.querySelector('.card__picture');
        this._picture.src = this._link;
        this._element.querySelector('.card__text').textContent = this._name;
        this._picture.alt = this._name;
        this._likeButton = this._element.querySelector('.card__like');
        this._deleteButton = this._element.querySelector('.card__trash');
        this._previewPopup = document.querySelector('.popup_preview');
        this._closeButton = this._previewPopup.querySelector('.popup__close');
        this._counter = this._element.querySelector('.card__like-count');
        this._counter.textContent = this._likesCounter.length;
        this._setEventListeners(); //Установка слушателей событий
        if (this._isLikedByMe) {
            this._likeButton.classList.add('card__like_active');
        }
        if (!this._myCard) {
            this._deleteButton.remove();
        }
        return this._element; //Возвращение готовой карточки
    };

    _setEventListeners() { //Установка слушателей событий
        this._likeButton.addEventListener('click', () => { //Слушатель на кнопку like
            //this._handleToggleLike(event); //Переключение состояния нажатой кнопки
            this._checkLikeOnCard();
        });
        this._deleteButton.addEventListener('click', () => { //Слушатель на кнопку delete
            this._deleteCard(); //Удаление карточки, на которую нажали
        });
        this._picture.addEventListener('click', () => {
            this._handleCardClick(this._link, this._name);
        });
    };

    handleToggleLike(res) { //Преключение состояния кнопки like при нажатии
        this._counter.textContent = res.likes.length;
        if (this._likeButton.classList.contains('card__like_active')) {
            this._likeButton.classList.remove('card__like_active');
        } else {
            this._likeButton.classList.add('card__like_active');
        }
    };

    handleRemoveCard() { //Удаление карточки
        this._element.remove();
    }; //FIX: Удалил лишний метод
};
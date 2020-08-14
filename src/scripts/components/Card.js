export default class Card { //Экспорт класса Card в index.js
    constructor(name, link, selector, { handleCardClick }) { //Конструктор класса с вводимыми данными
        this._link = link;
        this._name = name;
        this._template = selector;
        this._handleCardClick = handleCardClick;
    };

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
        this._picture.addEventListener('click', () => {
            this._handleCardClick(this._link, this._name);
        });
    };

    _handleToggleLike(event) { //Преключение состояния кнопки like при нажатии
        event.target.classList.toggle('card__like_active');
    };

    _handleRemoveCard(event) { //Удаление карточки
        const currentCard = event.target.closest('.card');
        currentCard.remove();
        this._element = null; //FIX: Добавил зануление карточки для освобождения памяти //FIX2: Исправил ошибку с currentCard
    }; //FIX: Удалил лишний метод
};
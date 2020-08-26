import './index.css'; //FIX: Поднял импорт стилей CSS выше остальных импортов
import Section from '../scripts/components/Section.js'; 
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

let initialCardsList;

let currentCard;

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_type_disabled',
    inputErrorClass: '.popup__input-error',
    inputTypeError: '.popup__input_type_error'
};

const buttons = Array.from(document.querySelectorAll('.popup__save'));
const editForm = document.querySelector('.popup__form-edit');
const addForm = document.querySelector('.popup__form-add');
const editPopupButton = document.querySelector('.profile__edit-button');
const addPopupButton = document.querySelector('.profile__add-button');
const changePhotoButton = document.querySelector('.profile__overlay');
const avatar = document.querySelector('.profile__avatar');

const editPopupValidation = new FormValidator(validationConfig, editForm);
const createPopupValidation = new FormValidator(validationConfig, addForm);

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/',
    headers: {
        authorization: '63c8231e-4dd4-48bc-b700-4bf0fbfba0d6',
        'Content-Type': 'application/json'
    }
});

const userInfo = new UserInfo({ //Экземпляр класса с информацией о пользователе
    userName: 'profile__name', 
    userData: 'profile__activity'
    }
);

const popupPreview = new PopupWithImage('popup_preview', { //Экземпляр класса с увеличенной картинкой
    imageSelector: 'popup__picture',
    descriptionSelector: 'popup__description'
    }
);

const popupEdit = new PopupWithForm('popup_edit-profile', { //Экземпляр класса popup'а с редактированием информации в профиле
    callback: ({name, activity}) => {
            userInfo.setUserInfo({name, activity});
            api.patchUserInfo(name, activity);
        }
    }
);

const popupAdd = new PopupWithForm('popup_create-card', { //Экземпляр класса popup'а с добавлением новой карточки в галлерею
    callback: ({place, link}) => {
        api.addNewCard(place, link).then((res) => {
            initialCardsList.addItem(createCard(res));
            popupAdd.close();
            })
        }
    }
);

const popupRemove = new PopupWithConfirm('popup_remove-card', () => {
    api.removeMyCard(currentCard.getCurrentId()).then(() => {
        popupRemove.close();
        currentCard.handleRemoveCard();
    });
});

const popupUpdatePhoto = new PopupWithForm('popup_update-photo', {
    callback: ({url}) => {
        api.patchUserPhoto(url).then(() => {
            avatar.style.background = `url('${url}')`;
        })
    }
})

popupPreview.setEventListeners(); //FIX: Убрал из конструктора назначение слушателей и перенес их в index.js для каждого модального окна
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupUpdatePhoto.setEventListeners();

editPopupButton.addEventListener('click', () => { //Добавление слушателей при открытии popup'а редактирования профиля
    popupEdit.open();
    userInfo.getUserInfo();
    editPopupValidation.hideInputErrors();
    buttons.forEach((button) => { //FIX: Исправил баг с неактивной кнопкой
        button.classList.remove(validationConfig.inactiveButtonClass);
        button.removeAttribute('disabled', true);
    });
});

addPopupButton.addEventListener('click', () => { //Добавление слушателей при открытии popup'а добавления карточки
    popupAdd.open();
    createPopupValidation.hideInputErrors();
    buttons.forEach((button) => {
        button.classList.add(validationConfig.inactiveButtonClass);
        button.setAttribute('disabled', true);
    });
})

changePhotoButton.addEventListener('click', () => {
    popupUpdatePhoto.open();
})

function checkLikeOnCard () {
    if (this._isLikedByMe) {
        api.unsetLikeOnCard(this.getCurrentId()).then(res => {
            this.handleToggleLike(res);
            console.log(res);
        })
    } else {
        api.setLikeOnCard(this.getCurrentId()).then(res => {
            this.handleToggleLike(res);
            console.log(res);
        })
    }
};

function deleteCard () {
    currentCard = this;
    popupRemove.open();
    popupRemove.setEventListeners();
}

function createCard(item) {
    const createdCard = new Card(item, checkLikeOnCard, deleteCard, '#card', userInfo.id, handleCardClick)
    return createdCard.generateCard();
}

function handleCardClick(src, name) {
    popupPreview.open(src, name);
}

api.getInitialCards().then(elements => {
    initialCardsList = new Section({ //Изначальный массив созданных карточек с функцией
        items: elements.reverse(),
        renderer: (item) => {
            const card = new Card(item, checkLikeOnCard, deleteCard, '#card', userInfo.id,  {
                handleCardClick: (src, name) => {
                    popupPreview.open(src, name);
                }}).generateCard();
            initialCardsList.addItem(card);
            },
        },
        'elements'
    );
    initialCardsList.renderItems();
});

api.getUserInfo().then((res) => {
    userInfo.setUserInfo({
        name: res.name,
        activity: res.about,
        id: res._id
    })
});

editPopupValidation.enableValidation(); //Активация валидации
createPopupValidation.enableValidation(); //Активация валидации
import './index.css'; //FIX: Поднял импорт стилей CSS выше остальных импортов
import {initialCards} from '../scripts/utils/initial-cards.js';
import Section from '../scripts/components/Section.js'; 
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

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

const editPopupValidation = new FormValidator(validationConfig, editForm);
const createPopupValidation = new FormValidator(validationConfig, addForm); 

const initialCardsList = new Section({ //Изначальный массив созданных карточек с функцией
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item.name, item.link, '#card', {
            handleCardClick: (src, name) => {
                popupPreview.open(src, name);
            }}).generateCard();
        initialCardsList.addItem(card);
        },
    },
    'elements'
);

initialCardsList.renderItems();

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
        }
    }
);

const popupAdd = new PopupWithForm('popup_create-card', { //Экземпляр класса popup'а с добавлением новой карточки в галлерею
    callback: ({place, link}) => {
            const createdCard = new Card(place, link, '#card', {
                handleCardClick: (src, name) => {
                    popupPreview.open(src, name);
            }}).generateCard();
            initialCardsList.addItem(createdCard);
        }
    }
)

popupPreview.setEventListeners(); //FIX: Убрал из конструктора назначение слушателей и перенес их в index.js для каждого модального окна
popupEdit.setEventListeners();
popupAdd.setEventListeners();

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

editPopupValidation.enableValidation(); //Активация валидации
createPopupValidation.enableValidation(); //Активация валидации
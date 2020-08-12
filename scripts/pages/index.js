import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js'; //Импорт класса Card
import FormValidator from '../components/FormValidator.js'; //Импорт класса FormValidator
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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

const editPopupValidation = new FormValidator(validationConfig, editForm); //Экземпляр класса FormValidator
const createPopupValidation = new FormValidator(validationConfig, addForm); //Экземпляр класса FormValidator

const initialCardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item.name, item.link, '#card').generateCard();
        initialCardsList.addItem(card);
        },
    },
    'elements'
);

initialCardsList.renderItems();

const userInfo = new UserInfo({
    userName: 'profile__name', 
    userData: 'profile__activity'
    }
);

const popupPreview = new PopupWithImage('popup_preview', {
    imageSelector: 'popup__image',
    descriptionSelector: 'popup__description'
    }
);

const popupEdit = new PopupWithForm('popup_edit-profile', {
    callback: ({name, activity}) => {
            userInfo.setUserInfo({name, activity});
        }
    }
);

const popupAdd = new PopupWithForm('popup_create-card', {
    callback: ({place, link}) => {
            const createdCard = new Card(place, link, '#card').generateCard();
            initialCardsList.addItem(createdCard);
        }
    }
)

editPopupButton.addEventListener('click', () => {
    popupEdit.open();
    userInfo.getUserInfo();
    editPopupValidation.hideInputErrors();
    buttons.forEach((button) => {
        button.classList.add(validationConfig.inactiveButtonClass);
        button.setAttribute('disabled', true);
    });
});

addPopupButton.addEventListener('click', () => {
    popupAdd.open();
    createPopupValidation.hideInputErrors();
    buttons.forEach((button) => {
        button.classList.add(validationConfig.inactiveButtonClass);
        button.setAttribute('disabled', true);
    });
})

editPopupValidation.enableValidation(); //Активировация валидации формы
createPopupValidation.enableValidation(); //Активировация валидации формы
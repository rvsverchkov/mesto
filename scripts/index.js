import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const items = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_type_disabled',
    inputErrorClass: '.popup__input-error',
    inputTypeError: '.popup__input_type_error'
};

const popups = Array.from(document.querySelectorAll('.popup'));
const popupEdit = document.querySelector('.popup_edit-profile');
const popupCreate = document.querySelector('.popup_create-card');
const popupOpenButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupCloseEditButton = document.querySelector('.popup__close-edit');
const popupCloseAddButton = document.querySelector('.popup__close-add');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__activity');
const formElementEdit = document.querySelector('.popup__form-edit');
const formElementAdd = document.querySelector('.popup__form-add');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');
const elements = document.querySelector('.elements');
const buttons = Array.from(document.querySelectorAll('.popup__save'));
const editForm = document.querySelector('.popup__form-edit');
const addForm = document.querySelector('.popup__form-add');

const editPopupValidation = new FormValidator(items, editForm);
const createPopupValidation = new FormValidator(items, addForm);

export const closePopup = function() { //Создал отдельную функцию для закрытия popup'а, поскольку в изначальном коде не получалось это реализовать
    const focusPopup = document.querySelector('.popup_opened');
    popupToggle(focusPopup);
    removeCloseOnEsc(); //Вместо условной конструкции добавил удаление уже в саму функцию закрытия popup'а
    buttons.forEach((button) => {
        button.classList.remove(items.inactiveButtonClass);
        button.removeAttribute('disabled', true);
    });
};

const escapePressedHandler = function(event) { //Создал функцию по добавлению обработки нажатия ESC и закрытия popup'а
    if (event.key === 'Escape') {
        closePopup();
    }
};

const removeCloseOnEsc = function() { //Создал функцию удаления обработки нажатия ESC
    document.removeEventListener('keydown', escapePressedHandler);
};

const openPopupEditProfile = function() { //Изменил название на более понятное и отражающее функционал
    popupToggle(popupEdit); //Заменил дублировавщийся код на функцию popupToggle()
    document.addEventListener('keydown', escapePressedHandler); //Переместил слушатель нажатия ESC в каждый popup, при его открытии
    if (popupEdit.classList.contains('popup_opened')) {
        nameInput.value = name.textContent;
        jobInput.value = job.textContent;
    } else {
        return;
    }
};

const openPopupCreateCard = function() { //Изменил название на более понятное и отражающее функционал
    popupToggle(popupCreate); //Заменил дублировавщийся код на функцию popupToggle()
    document.addEventListener('keydown', escapePressedHandler); //Переместил слушатель нажатия ESC в каждый popup, при его открытии
    if (popupCreate.classList.contains('popup_opened')) {
        placeInput.value = '';
        linkInput.value = '';
        buttons.forEach((button) => {
            button.classList.add(items.inactiveButtonClass);
            button.setAttribute('disabled', true);
        });
    }
};

const formSubmitHandlerProfile = function(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    openPopupEditProfile();
};

const formSubmitHandlerCard = function(evt) {
    evt.preventDefault();
    console.log('123');
    const card = new Card(placeInput.value, linkInput.value, '#card');
    const cardElement = card.generateCard();
    elements.prepend(cardElement);
    openPopupCreateCard();
};

const popupToggle = function(popup) { 
    popup.classList.toggle('popup_opened');
};

formElementEdit.addEventListener('submit', formSubmitHandlerProfile);
popupOpenButton.addEventListener('click', openPopupEditProfile);
popupCloseEditButton.addEventListener('click', closePopup);
formElementAdd.addEventListener('submit', formSubmitHandlerCard);
addCardButton.addEventListener('click', openPopupCreateCard);
popupCloseAddButton.addEventListener('click', closePopup);

initialCards.forEach((element) => { //FIXED
    const card = new Card(element.name, element.link, '#card');
    const cardElement = card.generateCard();
    elements.prepend(cardElement);
});

popups.forEach(function(element) {
    element.addEventListener('mousedown', function(evt) {   //Закрытие popup'а по нажатию на overlay
        if (evt.target !== evt.currentTarget) {
            return
        } else {
            closePopup();
        }
    });
});

editPopupValidation.enableValidation();
createPopupValidation.enableValidation();

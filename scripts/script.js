import {initialCards} from './utils.js';

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
const cardTemplate = document.querySelector('#card').content;
const elements = document.querySelector('.elements');
const previewCloseButton = document.querySelector('.popup__close-preview');
const saveButtons = document.querySelectorAll('.popup__save');

const popupEditProfile = function() {
    popupEdit.classList.toggle('popup_opened');
    if (popupEdit.classList.contains('popup_opened')) {
        nameInput.value = name.textContent;
        jobInput.value = job.textContent;
    } else {
        return;
    }
};

const popupCreateCard = function() {
    popupCreate.classList.toggle('popup_opened');
    if (popupCreate.classList.contains('popup_opened')) {
        placeInput.value = '';
        linkInput.value = '';
    }
};

const formSubmitHandlerProfile = function(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popupEditProfile();
};

const formSubmitHandlerCard = function(evt) {
    evt.preventDefault();
    createCard( placeInput.value, linkInput.value);
    popupCreateCard();
}

const likeToggle = function(evt) {
    evt.target.classList.toggle('card__like_active');
}

const deleteCard = function(evt) {
    const currentCard = evt.target.closest('.card');
    currentCard.remove();
}

const previewCard = function(evt) {
    const previewPopup = document.querySelector('.popup_preview');
    previewPopup.classList.toggle('popup_opened');
    previewPopup.querySelector('.popup__picture').src = evt.target.src;
    previewPopup.querySelector('.popup__description').textContent = evt.target.alt;
}

const createCard = function(name, link) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.card__picture').src = link;
    card.querySelector('.card__picture').alt = name;
    card.querySelector('.card__text').textContent = name;
    card.querySelector('.card__like').addEventListener('click', likeToggle);
    card.querySelector('.card__trash').addEventListener('click', deleteCard);
    card.querySelector('.card__picture').addEventListener('click', previewCard);
    elements.prepend(card);
}

const checkInputValidity = (formElement, inputElement) => {    //Проверка валидности вводимого текста/URL
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
        saveButtons.forEach(function(saveButton) {
            saveButton.classList.add('popup__save_type_disabled');
        });
        formElementEdit.removeEventListener('submit', formSubmitHandlerProfile);
        formElementAdd.removeEventListener('submit', formSubmitHandlerCard);
    } else {
        hideInputError(formElement, inputElement);
        saveButtons.forEach(function(saveButton) {
            saveButton.classList.remove('popup__save_type_disabled');
        });
        formElementEdit.addEventListener('submit', formSubmitHandlerProfile);
        formElementAdd.addEventListener('submit', formSubmitHandlerCard);
    }
};

const setEventListeners = (formElement) => {    //Перебор массива полей ввода с установкой слушателей
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement);
        });
    });
};

const showInputError = (formElement, inputElement, errorMessage) => {   //Показ ошибки при вводе
    const errorItem = formElement.querySelector(`#${inputElement.id}-error`);
    errorItem.textContent = errorMessage;
    inputElement.classList.add('popup__input_type_error');

};

const hideInputError = (formElement, inputElement) => {    //Скрытие сообщения об ошибке при вводе
    const errorItem = formElement.querySelector(`#${inputElement.id}-error`);
    errorItem.textContent = '';
    inputElement.classList.remove('popup__input_type_error');
}

const activateValidation = () => {  //Активация валидации                                      
    const formList = Array.from(document.querySelectorAll('.popup__form'))
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

formElementEdit.addEventListener('submit', formSubmitHandlerProfile);
popupOpenButton.addEventListener('click', popupEditProfile);
popupCloseEditButton.addEventListener('click', popupEditProfile);
formElementAdd.addEventListener('submit', formSubmitHandlerCard);
addCardButton.addEventListener('click', popupCreateCard);
popupCloseAddButton.addEventListener('click', popupCreateCard);
previewCloseButton.addEventListener('click', previewCard);

initialCards.forEach(function(element) {
    createCard(element.name, element.link);
});

popups.forEach(function(element) {
    element.addEventListener('click', function(evt) {   //Закрытие popup'а по нажатию на overlay
        if (evt.target !== evt.currentTarget) {
            return
        } else {
            element.classList.remove('popup_opened');
        }
    });
    document.addEventListener('keydown', function(evt) {    //Закрытие popup'а по нажатию клавиша Escape
        if (evt.key === 'Escape') {
            element.classList.remove('popup_opened');
        }
    });
});

activateValidation();
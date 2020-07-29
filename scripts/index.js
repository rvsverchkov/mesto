import {Card} from './Card.js'; //Импорт класса Card
import {FormValidator} from './FormValidator.js'; //Импорт класса FormValidator

const items = { //Вынес объект с селекторами для валидации в основной файл
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

const editPopupValidation = new FormValidator(items, editForm); //Создал экземпляр класса FormValidator
const createPopupValidation = new FormValidator(items, addForm); //Создал экземпляр класса FormValidator

export const closePopup = function() { //Создал отдельную функцию для закрытия popup'а, поскольку в изначальном коде не получалось это реализовать
    const focusPopup = document.querySelector('.popup_opened');
    popupToggle(focusPopup);
    removeCloseOnEsc(); //Вместо условной конструкции добавил удаление уже в саму функцию закрытия popup'а
    buttons.forEach((button) => {
        button.classList.remove(items.inactiveButtonClass);
        button.removeAttribute('disabled', true);
    });
    editPopupValidation._hideInputError();
    createPopupValidation._hideInputError();
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

const openPopupCreateCard = function() { //Открытие popup'а для создания карточки
    popupToggle(popupCreate);
    document.addEventListener('keydown', escapePressedHandler); //Добавление слушателя на нажатие клавиши
    if (popupCreate.classList.contains('popup_opened')) { //Проверка на то, открыт ли popup
        placeInput.value = '';
        linkInput.value = '';
        buttons.forEach((button) => { //Если же popup открыт, то массив кнопок перебирается и деактивирует их
            button.classList.add(items.inactiveButtonClass); //И добавляет класс неактивной кнопки
            button.setAttribute('disabled', true);
        });
    }
};

const formSubmitHandlerProfile = function(evt) { //Функция изменения информации в профиле пользователя
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    openPopupEditProfile();
};

const formSubmitHandlerCard = function(evt) { //Функция создания карточки при нажатии на кнопку отправки формы
    evt.preventDefault();
    const card = new Card(placeInput.value, linkInput.value, '#card'); //Создание экземпляра класса Card
    const cardElement = card.generateCard(); //Применение метода для создания новой карточки
    elements.prepend(cardElement); //Вставка готовой карточки в elements
    openPopupCreateCard();
};

const popupToggle = function(popup) { //Переключение состояния popup'а
    popup.classList.toggle('popup_opened');
};

formElementEdit.addEventListener('submit', formSubmitHandlerProfile);
popupOpenButton.addEventListener('click', openPopupEditProfile);
popupCloseEditButton.addEventListener('click', closePopup);
formElementAdd.addEventListener('submit', formSubmitHandlerCard);
addCardButton.addEventListener('click', openPopupCreateCard);
popupCloseAddButton.addEventListener('click', closePopup);

initialCards.forEach((element) => { //FIXED
    const card = new Card(element.name, element.link, '#card'); //Также создал экземпляр класса Card
    const cardElement = card.generateCard(); //Применил метод для создания новой карточки
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

editPopupValidation.enableValidation(); //Активировал валидацию формы
createPopupValidation.enableValidation(); //Активировал валидацию формы
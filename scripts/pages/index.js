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

/*const popups = Array.from(document.querySelectorAll('.popup'));
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
const elements = document.querySelector('.elements');*/
const buttons = Array.from(document.querySelectorAll('.popup__save'));
const editForm = document.querySelector('.popup__form-edit');
const addForm = document.querySelector('.popup__form-add');
const editPopupButton = document.querySelector('.profile__edit-button');
const addPopupButton = document.querySelector('.profile__add-button');

const editPopupValidation = new FormValidator(validationConfig, editForm); //Экземпляр класса FormValidator
const createPopupValidation = new FormValidator(validationConfig, addForm); //Экземпляр класса FormValidator

/*const closePopup = function() {
    const focusPopup = document.querySelector('.popup_opened');
    popupToggle(focusPopup);
    removeCloseOnEsc(); //Вместо условной конструкции добавил удаление уже в саму функцию закрытия popup'а
    buttons.forEach((button) => {
        button.classList.remove(validationConfig.inactiveButtonClass);
        button.removeAttribute('disabled', true);
    });
    editPopupValidation.hideInputErrors();
    createPopupValidation.hideInputErrors();
};*/

/*const escapePressedHandler = function(event) { //Создал функцию по добавлению обработки нажатия ESC и закрытия popup'а
    if (event.key === 'Escape') {
        closePopup();
    }
};*/

/*const removeCloseOnEsc = function() { //Создал функцию удаления обработки нажатия ESC
    document.removeEventListener('keydown', escapePressedHandler);
};*/

/*const openPopupEditProfile = function() { //Изменил название на более понятное и отражающее функционал
    popupToggle(popupEdit); //Заменил дублировавщийся код на функцию popupToggle()
    document.addEventListener('keydown', escapePressedHandler); //Переместил слушатель нажатия ESC в каждый popup, при его открытии
    if (popupEdit.classList.contains('popup_opened')) {
        nameInput.value = name.textContent;
        jobInput.value = job.textContent;
    } else {
        return;
    }
};*/

/*const openPopupCreateCard = function() { //Открытие popup'а для создания карточки
    popupToggle(popupCreate);
    document.addEventListener('keydown', escapePressedHandler); //Добавление слушателя на нажатие клавиши
    if (popupCreate.classList.contains('popup_opened')) { //Проверка на то, открыт ли popup
        placeInput.value = '';
        linkInput.value = '';
        buttons.forEach((button) => { //Если же popup открыт, то массив кнопок перебирается и деактивирует их
            button.classList.add(validationConfig.inactiveButtonClass); //И добавляет класс неактивной кнопки
            button.setAttribute('disabled', true);
        });
    }
};*/

/*const formSubmitHandlerProfile = function(evt) { //Функция изменения информации в профиле пользователя
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    openPopupEditProfile();
};*/

/*const formSubmitHandlerCard = function(evt) { //Функция создания карточки при нажатии на кнопку отправки формы
    evt.preventDefault();
    const card = new Card(placeInput.value, linkInput.value, '#card'); //Создание экземпляра класса Card
    const cardElement = card.generateCard(); //Применение метода для создания новой карточки
    elements.prepend(cardElement); //Вставка готовой карточки в elements
    openPopupCreateCard();
};*/

/*const popupToggle = function(popup) { //Переключение состояния popup'а
    popup.classList.toggle('popup_opened');
};*/

/*formElementEdit.addEventListener('submit', formSubmitHandlerProfile);
popupOpenButton.addEventListener('click', openPopupEditProfile);
popupCloseEditButton.addEventListener('click', closePopup);
formElementAdd.addEventListener('submit', formSubmitHandlerCard);
/*addCardButton.addEventListener('click', openPopupCreateCard);
popupCloseAddButton.addEventListener('click', closePopup);*/

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

/*popups.forEach(function(element) {
    element.addEventListener('mousedown', function(evt) {   //Закрытие popup'а по нажатию на overlay
        if (evt.target !== evt.currentTarget) {
            return
        } else {
            if (element.classList.contains('popup_preview')) {
                popupToggle(element);
            } else {
                closePopup();
            }
        }
    });
});*/

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
    callback: () => {
        
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
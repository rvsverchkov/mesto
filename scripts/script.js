const initialCards = [
    {
        name: 'Амстердам',
        link: './images/amsterdam.jpg'
    },
    {
        name: 'Токио',
        link: './images/tokyo.jpg'
    },
    {
        name: 'Париж',
        link: './images/paris.jpg'
    },
    {
        name: 'Нью-Йорк',
        link: './images/new-york.jpg'
    },
    {
        name: 'Москва',
        link: './images/moscow.jpg'
    },
    {
        name: 'Лондон',
        link: './images/london.jpg'
    }
];
const popup = document.querySelector('.popup');     //Перенес объявление переменных/констант в начало файла
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
const buttonLike = cardTemplate.querySelector('.card__like');
const previewCloseButton = document.querySelector('.popup__close-preview');

let popupEditProfile = function() {
    popupEdit.classList.toggle('popup_opened');
    if (popupEdit.classList.contains('popup_opened')) {
        nameInput.value = name.textContent;
        jobInput.value = job.textContent;
    } else {
        return;
    }
};

let popupCreateCard = function() {
    popupCreate.classList.toggle('popup_opened');
    if (popupCreate.classList.contains('popup_opened')) {
        placeInput.value = '';
        linkInput.value = '';
    }
};

let formSubmitHandlerProfile = function(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popupEditProfile();
};

let formSubmitHandlerCard = function(evt) {
    evt.preventDefault();
    createCard( placeInput.value, linkInput.value);
    popupCreateCard();
}

let likeToggle = function(evt) {
    evt.target.classList.toggle('card__like_active');
}

let deleteCard = function(evt) {
    const currentCard = evt.target.closest('.card');
    currentCard.remove();
}

let previewCard = function(evt) {
    const previewPopup = document.querySelector('.popup_preview');
    previewPopup.classList.toggle('popup_opened');
    previewPopup.querySelector('.popup__picture').src = evt.target.src;
    previewPopup.querySelector('.popup__description').textContent = evt.target.alt;
}

let createCard = function(name, link) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.card__picture').src = link;
    card.querySelector('.card__picture').alt = name;
    card.querySelector('.card__text').textContent = name;
    card.querySelector('.card__like').addEventListener('click', likeToggle);
    card.querySelector('.card__trash').addEventListener('click', deleteCard);
    card.querySelector('.card__picture').addEventListener('click', previewCard);
    elements.prepend(card);
}

formElementEdit.addEventListener('submit', formSubmitHandlerProfile);      //Переместил слушатели событий в конец файла
popupOpenButton.addEventListener('click', popupEditProfile);
popupCloseEditButton.addEventListener('click', popupEditProfile);
formElementAdd.addEventListener('submit', formSubmitHandlerCard);
addCardButton.addEventListener('click', popupCreateCard);
popupCloseAddButton.addEventListener('click', popupCreateCard);
previewCloseButton.addEventListener('click', previewCard);

initialCards.forEach(function(element) {
    createCard(element.name, element.link);
});
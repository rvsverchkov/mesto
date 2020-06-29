const initialCards = [
    {
        name: 'Лондон',
        link: './images/london.jpg'
    },
    {
        name: 'Москва',
        link: './images/moscow.jpg'
    },
    {
        name: 'Нью-Йорк',
        link: './images/new-york.jpg'
    },
    {
        name: 'Париж',
        link: './images/paris.jpg'
    },
    {
        name: 'Токио',
        link: './images/tokyo.jpg'
    },
    {
        name: 'Амстердам',
        link: './images/amsterdam.jpg'
    }
];
const popup = document.querySelector('.popup');     //Перенес объявление переменных/констант в начало файла
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__activity');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const saveButton = popup.querySelector('.popup__save');
const cardTemplate = document.querySelector('#card').content;
const elements = document.querySelector('.elements');

let popupToggle = function() {
    popup.classList.toggle('popup_opened');     //Добавил занесение данных в форму при открытии popup'а
    if (popup.classList.contains('popup_opened')) {
        nameInput.value = name.textContent;
        jobInput.value = job.textContent;
    } else {
        return;
    }
};

let formSubmitHandler = function(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popupToggle();
};

let createCard = function(name, link) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.card__picture').src = link;
    card.querySelector('.card__picture').alt = name;
    card.querySelector('.card__text').textContent = name;
    elements.append(card);
}

formElement.addEventListener('submit', formSubmitHandler);      //Переместил слушатели событий в конец файла
popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);

initialCards.forEach( function(element) {
    createCard(element.name, element.link);
});
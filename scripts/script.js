const popup = document.querySelector('.popup');     //Перенес объявление переменных/констант в начало файла
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__activity');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__name-input');
const jobInput = document.querySelector('.popup__job-input');
const saveButton = popup.querySelector('.popup__save');

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

formElement.addEventListener('submit', formSubmitHandler);      //Переместил слушатели событий в конец файла
popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
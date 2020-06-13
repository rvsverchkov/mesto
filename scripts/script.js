const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');

let popupToggle = function() {
    popup.classList.toggle('popup_opened');
};

let popupOverlay = function(event) {
    if (event.target !== event.currentTarget) {
        return
    } else {
        popupToggle();
    }
};

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popup.addEventListener('click', popupOverlay);

const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__activity');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__name-input');
const jobInput = document.querySelector('.popup__job-input');
const saveButton = popup.querySelector('.popup__save');

let formSubmitHandler = function(evt) {
    evt.preventDefault();
    if (nameInput.value !== '' && jobInput.value !== '') {
        name.textContent = nameInput.value;
        job.textContent = jobInput.value;
        popupToggle();
    } else {
        return;
    };
}

formElement.addEventListener('submit', formSubmitHandler);
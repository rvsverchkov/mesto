let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close');

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

let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__activity');
let nameInput = popup.querySelector('.popup__name-input');
let jobInput = popup.querySelector('.popup__job-input');
let saveButton = popup.querySelector('.popup__save');

let nameChange = function() {
    let nameText = nameInput.value;
    name.textContent = nameText;
};

let activityChange = function() {
    let activityText = jobInput.value;
    job.textContent = activityText;
};

let formSubmitHandler = function() {
    if (nameInput.value !== '' && jobInput.value !== '') {
        nameChange();
        activityChange();
    } else {
        return;
    }
    popupToggle();
};

saveButton.addEventListener('click', formSubmitHandler);
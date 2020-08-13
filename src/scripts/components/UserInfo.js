export default class UserInfo {
    constructor({ userName, userData }) { //Конструктор
        this._name = document.querySelector(`.${userName}`);
        this._job = document.querySelector(`.${userData}`);
    }

    setUserInfo({name, activity}) { //Установка информации о пользователе
        this._name.textContent = name;
        this._job.textContent = activity;
    }

    getUserInfo() { //Получение изначальной информации о пользователе (До изменения данных)
        this._nameInput = document.querySelector('.popup__input_type_name');
        this._jobInput = document.querySelector('.popup__input_type_job');
        this._nameInput.value = this._name.textContent;
        this._jobInput.value = this._job.textContent;
    }
}
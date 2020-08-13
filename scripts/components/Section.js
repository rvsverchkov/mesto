export default class Section {
    constructor({ items, renderer}, containerSelector) { //Контсруктор
        this._renderedItems = items;
        this._renderer = renderer; //Коллбек функция
        this._container = document.querySelector(`.${containerSelector}`);
    }

    renderItems() { //Функция вызывающая для каждой карточки другую функцию, создающую саму карточку
        this._renderedItems.forEach(item => this._renderer(item))
    }

    addItem(element) { //Добавление элемента в DOM
        this._container.prepend(element);
    }
}
export default class Api {
    constructor({ baseUrl, headers, cohort }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
        this.cohort = cohort;
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}v1/cohort-14/cards`, { 
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}v1/cohort-14/users/me`, { 
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    patchUserInfo(name, about) {
        return fetch(`${this.baseUrl}v1/cohort-14/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    patchUserPhoto(url) {
        return fetch(`${this.baseUrl}v1/cohort-14/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: url
            })
        })
    }

    addNewCard(place, link) {
        return fetch(`${this.baseUrl}v1/cohort-14/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: place,
                link: link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    setLikeOnCard(currentCardId) {
        return fetch(`${this.baseUrl}v1/cohort-14/cards/likes/${currentCardId}`, {
            method: 'PUT',
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    unsetLikeOnCard(currentCardId) {
        return fetch(`${this.baseUrl}v1/cohort-14/cards/likes/${currentCardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    removeMyCard(currentCardId) {
        return fetch(`${this.baseUrl}v1/cohort-14/cards/${currentCardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    createItems() {

    }
}
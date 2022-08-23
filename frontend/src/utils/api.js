import { headers, url } from "./constants.js";

class Api {
  constructor(options) {
    this._url = options.baseUrl
    this._headers = options.headers
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(this._checkResponse)
      .then((data) => {
        return data
      })
  }

  addCard(method, data, addUrl = '/cards') {
    return fetch(this._url + addUrl, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse)
  }

  deleteCard(method, cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      headers: this._headers,
      method: method,
    })
      .then(this._checkResponse)
  }

  changeLikeCard(method, cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: method,
    })
      .then(this._checkResponse)
  }

  setProfile() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then(data => {
        return data;
      })
  }

  updateUserInfo(data) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse)
      .then(data => {
        return data;
      })
  }

  updateAvatar(data) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse)
      .then(data => {
        return data;
      })
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: url,
  headers: headers,
  method: 'GET',
});

export default api

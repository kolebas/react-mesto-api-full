import { url } from './constants.js';

class Api {
  constructor(options) {
    this._url = options.baseUrl
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
      .then((data) => {
        return data
      })
  }

  addCard(method, data, addUrl = '/cards') {
    return fetch(this._url + addUrl, {
      method: method,
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(this._checkResponse)
  }

  deleteCard(method, cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      method: method,
    })
      .then(this._checkResponse)
  }

  changeLikeCard(method, cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      method: method,
    })
      .then(this._checkResponse)
  }

  setProfile() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
      .then(data => {
        return data;
      })
  }

  updateUserInfo(data) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
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
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
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
  method: 'GET',
});

export default api

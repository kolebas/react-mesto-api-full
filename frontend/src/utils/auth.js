import { headers, authUrl } from "./constants.js"

class Auth{
  constructor(options){
    this._url = options.baseUrl
    this._headers = options.headers
  }

  register(method,data){
    return fetch(authUrl + '/signup', {
      method: method,
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse) 
  }

  auth(method,data){
    return fetch(authUrl + '/signin', {
      method: method,
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse) 
  }

  checkToken(method){
    return fetch(authUrl + '/users/me', {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then(this._checkResponse) 
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const auth = new Auth({
  baseUrl: authUrl,
  headers: headers,
  method: 'GET',
});

export default auth
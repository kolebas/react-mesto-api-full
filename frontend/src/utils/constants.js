export const url = 'https://back.kolebas.nomoredomains.sbs';
export const headers = {
  "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
  'Content-Type': 'application/json'
};

export const authUrl = 'https://back.kolebas.nomoredomains.sbs';
export class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    _handleResponse(res) {
        if (!res.ok ) {
            return Promise.reject(console.log(`Ой, что-то пошло не так. Ошибка ${res.status}`));
        }
        return res.json();
    }

    register( name, email, password ) {
        return fetch(`${this.url}/signup`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({ name, email, password })
        })
        .then(this._handleResponse)
    }

    authorize( name, email, password ) {
        return fetch(`${this.url}/signin`, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({ name, email, password })
        })
        .then(this._handleResponse)
      }
    
}

const api = new Api({
    url: 'https://api.kateaedon.movie.nomoredomains.icu',
    headers: {
        'Content-Type': 'application/json'
  },
});

export default api;

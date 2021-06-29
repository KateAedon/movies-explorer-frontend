class Api {
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

    getHeader() {
        return {
            ...this.headers,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    checkToken(token) {
        return fetch(`${this.url}/users/me`, {
          method: 'GET',
          headers: {
            ...this.headers,
            Authorization: `Bearer ${token}`
          }
        })
        .then(this._handleResponse)
    }

    register( name, email, password ) {
        return fetch(`${this.url}/signup`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({ name, email, password })
        })
        .then(this._handleResponse)
    }

    login( email, password ) {
        return fetch(`${this.url}/signin`, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({ email, password })
        })
        .then(this._handleResponse)
    }

    getProfileInfo() {
        return fetch(`${this.url}/users/me`, {
            method: "GET",
            headers: this.getHeader(),
        }).then(this._handleResponse)
    }

    updateProfileInfo(data) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.getHeader(),
            body: JSON.stringify(data)  
        }).then(this._handleResponse)
    }
}

const api = new Api({
    url: 'http://localhost:3001',
    //'https://api.kateaedon.movie.nomoredomains.icu',
    headers: {
        'Content-Type': 'application/json'
  },
});

export default api;

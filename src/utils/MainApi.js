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
        })
        .then(this._handleResponse)
    }

    updateProfileInfo(data) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.getHeader(),
            body: JSON.stringify(data)  
        })
        .then(this._handleResponse)
    }

    saveMovie(movie) {
        return fetch(`${this.url}/movies`, {
            method: 'POST',
            headers: this.getHeader(),
            body: JSON.stringify({ 
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: movie.image,
                trailer: movie.trailer,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                thumbnail: movie.image,
                movieId: movie.movieId,
             }),
        })
        .then(this._handleResponse)
    }

    deleteMovie(movieId) {
        return fetch(`${this.url}/movies/${movieId}`, {
            method: 'DELETE',
            headers: this.getHeader(),
          })
          .then(this._handleResponse)
    }

    getSavedMovies() {
        return fetch(`${this.url}/movies`, {
            method: 'GET',
            headers: this.getHeader(),
        })
        .then(this._handleResponse)
    }
}

const api = new Api({
    // url: 'http://localhost:3001',
    url: 'https://api.kateaedon.movie.nomoredomains.icu',
    headers: {
        'Content-Type': 'application/json'
  },
});

export default api;

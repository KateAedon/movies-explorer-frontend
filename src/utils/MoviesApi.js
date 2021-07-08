export class MoviesApi {
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

    getMoviesData() {
        return fetch(`${this.url}`, {
            method: "GET",
            headers: this.headers,
        })
        .then(this._handleResponse)
    }
}

const moviesApi = new MoviesApi({
    url: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json'
  },
});

export default moviesApi;

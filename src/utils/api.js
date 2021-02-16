class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._token = options.headers.authorization;
  }

  _checkResponse(response) {
    {if (response.ok) {
      return response.json();
    }
      return Promise.reject(`Ошибка ${response.status}`)
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkResponse)
  }

  updateUserData(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.career
      })
    })
      .then(this._checkResponse)
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.link
      })
    })
      .then(this._checkResponse)
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse)
  }

  removeCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkResponse)
  }

  doLike(_id, isLiked) {
    if(
      
      isLiked) {
      return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
        method: 'PUT',
        headers: {
          authorization: this._token
        }
      }
  )
      .then(this._checkResponse)
    } else {
        return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
          method: 'DELETE',
          headers: {
            authorization: this._token
          }
      })
        .then(this._checkResponse)
    }
  }

}


const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19",
  headers: {
    authorization: "a725ec8a-f191-4a4f-b4ad-38c2f082c6d7",
    "Content-Type": "application/json",
  },
});

export default api;

import './../index.css'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import api from './../utils/api'
import { useState, useEffect } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(undefined)
  const [currentUser, setCurrentUser] = useState('')
 
  useEffect(() => {
    api.getUserData()
      .then(response => {
        setCurrentUser(response)
      })
      .catch((err)=>{
        console.log(`Ошибка при загрузке данных пользователя: ${err}`)
      })
  })

  const handleCardClick = (data) => {
    setSelectedCard(data)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(undefined)
  }

  const handleUpdateUser = (data) => {
    api.updateUserData(data)
    .then((response) => {
      setCurrentUser(response)
      closeAllPopups()
    })
    .catch((err)=>{
      console.log(`Ошибка при отправке данных пользователя: ${err}`)
    })
  }

  const handleUpdateAvatar = (data) => {
    api.updateAvatar(data)
      .then((response) => {
        setCurrentUser(response)
        closeAllPopups()
      })
      .catch((err)=>{
        console.log(`Ошибка при отправке аватара: ${err}`)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header />
          <Main 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            card={selectedCard}
          />
          <Footer />
        </div>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 
        <PopupWithForm 
          name={'add-image'} 
          title={'Новое место'}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input id="photo-title-input" className="popup__input popup__input_type_title" type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required/>
          <span id="photo-title-input-error" className="popup__input-error"></span>
          <input id="photo-link-input" className="popup__input popup__input_type_link" type="url" name="link" placeholder="Ссылка на картинку" required/>
          <span id="photo-link-input-error" className="popup__input-error"></span>
          <button className="popup__btn" type="submit">Сохранить</button>
        </PopupWithForm>
        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups} 
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App

import './../index.css'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import { useState } from 'react'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(undefined)

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

  return (
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
      <PopupWithForm 
        name={'user-avatar'} 
        title={'Редактировать аватар'}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input id="user-avatar-input" className="popup__input" type="url" name="link" placeholder="Ссылка на картинку" required/>
        <span id="user-avatar-input-error" className="popup__input-error"></span>
        <button className="popup__btn" type="submit">Сохранить</button>
      </PopupWithForm>
      <PopupWithForm 
        name={'user-info'} 
        title={'Редактировать профиль'}
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
      >
        <input id="user-name-input" className="popup__input popup__input_type_name" type="text" name="name" minLength="2" maxLength="40" required/>
        <span id="user-name-input-error" className="popup__input-error"></span>
        <input id="user-career-input" className="popup__input popup__input_type_career" type="text" name="career" minLength="2" maxLength="200" required/>
        <span id="user-career-input-error" className="popup__input-error"></span>
        <button className="popup__btn" type="submit">Сохранить</button>
      </PopupWithForm>
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
  )
}

export default App

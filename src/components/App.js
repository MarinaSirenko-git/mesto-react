import './../index.css'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'
import api from './../utils/api'
import { useState, useEffect } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(undefined)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
 
  useEffect(() => {
    api.getUserData()
      .then(response => {
        setCurrentUser(response)
      })
      .catch((err)=>{
        console.log(`Ошибка при загрузке данных пользователя: ${err}`)
      })
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then((data) => {      
        setCards(data)
      })
      .catch((err)=>{
        console.log(`Ошибка при загрузке карточек: ${err}`)
      })
  }, [])

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(item => item._id === currentUser._id)
    api.doLike(card.cardId, !isLiked)
      .then((newCard) => {
        const newCards = cards.map(function(item) {return item._id === card.cardId ? newCard : item})
        setCards(newCards)
      })
      .catch((err)=>{
        console.log(`Ошибка: ${err}`)
      })
  }

  const handleCardDelete = (card) => {
    api.removeCard(card.cardId)
      .then(() => {
        const newCards = cards.filter(item => item._id !== card.cardId)
        setCards(newCards)
      })
  }

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
    setIsLoading(true)
    api.updateUserData(data)
    .then((response) => {
      setCurrentUser(response)
      closeAllPopups()
    })
    .catch((err)=>{
      console.log(`Ошибка при отправке данных пользователя: ${err}`)
    })
    .finally(() => setIsLoading(false))
  }

  const handleUpdateAvatar = (data) => {
    setIsLoading(true)
    api.updateAvatar(data)
      .then((response) => {
        setCurrentUser(response)
        closeAllPopups()
      })
      .catch((err)=>{
        console.log(`Ошибка при отправке аватара: ${err}`)
      })
      .finally(() => setIsLoading(false))
  }

  const handleAddPlaceSubmit = (data) => {
    setIsLoading(true)
    api.addNewCard(data)
      .then((card) => {
        setCards([card, ...cards])
        closeAllPopups()
      })
      .catch((err)=>{
        console.log(`Ошибка при создании новой карточки: ${err}`)
      })
      .finally(() => setIsLoading(false))
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
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />
        </div>
        <EditProfilePopup  isOpen={isEditProfilePopupOpen} isLoading={isLoading} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} isLoading={isLoading} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 
        <AddPlacePopup isOpen={isAddPlacePopupOpen} isLoading={isLoading} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App

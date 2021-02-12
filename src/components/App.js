import './../index.css'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
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
          isOpenProfile={isEditProfilePopupOpen}
          isOpenPlace={isAddPlacePopupOpen}
          isOpenAvatar={isEditAvatarPopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <Footer />
      </div>
    </div>
  )
}

export default App

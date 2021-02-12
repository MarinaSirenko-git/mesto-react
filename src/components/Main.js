import api from './../utils/api'
import Card from './Card'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import { useEffect, useState } from 'react'

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, isOpenProfile, isOpenPlace, isOpenAvatar, card, onClose}) {
  const [userName, setUserName] = useState([]);
  const [userDescription, setUserDescription] = useState([]);
  const [userAvatar, setUserAvatar] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserData()
      .then(response => {
          const userName = response.name;
          const userDescription = response.about;
          const userAvatar  = response.avatar;
          setUserName(userName);
          setUserDescription(userDescription);
          setUserAvatar(userAvatar);
        })
        .catch((err)=>{
          console.log(`Ошибка при загрузке данных пользователя: ${err}`)
        })
  }, [])



  useEffect(() => {
    api.getInitialCards()
      .then(response => {
        const cards = response.map(item => {
          return {
            name: item.name,
            link: item.link,
            likes: item.likes.length,
            id: item._id
          }
        })       
        setCards(cards)
      })
      .catch((err)=>{
        console.log(`Ошибка при загрузке карточек: ${err}`)
      })
  }, [])

  return (
    <main className="content page__main">
      <section className="user">
        <div className="user-info user__user-info-geometry">
          <div className="user-info__user-photo-wrap">
            <button className="user-info__edit-user-photo" onClick={onEditAvatar} type="button" aria-label="Редактировать аватар"></button>
            <PopupWithForm 
                name={'user-avatar'} 
                title={'Редактировать аватар'}
                isOpen={isOpenAvatar}
                onClose={onClose}
            >
              <input id="user-avatar-input" className="popup__input" type="url" name="link" placeholder="Ссылка на картинку" required/>
              <span id="user-avatar-input-error" className="popup__input-error"></span>
              <button className="popup__btn" type="submit">Сохранить</button>
            </PopupWithForm>
            <img className="user-info__user-photo" src={userAvatar} alt="Аватар"/>
          </div>
          <div className="user-info__about">
              <div className="user-info__edit-wrap">
                <h1 className="user-info__name">{userName}</h1>
                <button className="user-info__edit-icon" onClick={onEditProfile} type="button" aria-label="Редактировать имя"></button>
                <PopupWithForm 
                  name={'user-info'} 
                  title={'Редактировать профиль'}
                  isOpen={isOpenProfile} 
                  onClose={onClose}
                >
                  <input id="user-name-input" className="popup__input popup__input_type_name" type="text" name="name" minLength="2" maxLength="40" required/>
                  <span id="user-name-input-error" className="popup__input-error"></span>
                  <input id="user-career-input" className="popup__input popup__input_type_career" type="text" name="career" minLength="2" maxLength="200" required/>
                  <span id="user-career-input-error" className="popup__input-error"></span>
                  <button className="popup__btn" type="submit">Сохранить</button>
                </PopupWithForm>
              </div>
              <p className="user-info__career">{userDescription}</p>
          </div>
          <button className="user-info__add-icon" onClick={onAddPlace} aria-label="Добавить фото" type="button"></button>
          <PopupWithForm 
            name={'add-image'} 
            title={'Новое место'}
            isOpen={isOpenPlace}
            onClose={onClose}
          >
            <input id="photo-title-input" className="popup__input popup__input_type_title" type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required/>
            <span id="photo-title-input-error" className="popup__input-error"></span>
            <input id="photo-link-input" className="popup__input popup__input_type_link" type="url" name="link" placeholder="Ссылка на картинку" required/>
            <span id="photo-link-input-error" className="popup__input-error"></span>
            <button className="popup__btn" type="submit">Сохранить</button>
          </PopupWithForm>
        </div>
        <ul className="cards user__cards-geometry">
          {cards.map(item => <Card 
            key={item.id} 
            handleCardClick={onCardClick}
            card={card} {...item} />)
          }
          
          <ImagePopup 
            card={card} 
            onClose={onClose} 
          />
        </ul>
      </section>
    </main>
  )
}

export default Main;

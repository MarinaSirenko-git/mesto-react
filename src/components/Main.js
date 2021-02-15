import api from './../utils/api'
import Card from './Card'
import { useEffect, useState, useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, card}) {
  const userContext = useContext(CurrentUserContext)
  const [cards, setCards] = useState([])

  useEffect(() => {
    api.getInitialCards()
      .then(response => {
        const cards = response.map(item => {
          return {
            name: item.name,
            link: item.link,
            likes: item.likes.length,
            id: item._id,
            ownerId: item.owner._id
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
            <img className="user-info__user-photo" src={userContext.avatar} alt="Аватар"/>
          </div>
          <div className="user-info__about">
              <div className="user-info__edit-wrap">
                <h1 className="user-info__name">{userContext.name}</h1>
                <button className="user-info__edit-icon" onClick={onEditProfile} type="button" aria-label="Редактировать имя"></button>
              </div>
              <p className="user-info__career">{userContext.about}</p>
          </div>
          <button className="user-info__add-icon" onClick={onAddPlace} aria-label="Добавить фото" type="button"></button>
        </div>
        <ul className="cards user__cards-geometry">
          {cards.map(item => (
            <Card 
              key={item.id} 
              handleCardClick={onCardClick}
              card={card} {...item} 
            />
          )
          )}
        </ul>
      </section>
    </main>
  )
}

export default Main;

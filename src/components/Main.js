import api from './../utils/api'
import Card from './Card'
import { useEffect, useState } from 'react'

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, card}) {
  const [userName, setUserName] = useState([])
  const [userDescription, setUserDescription] = useState([])
  const [userAvatar, setUserAvatar] = useState([])
  const [cards, setCards] = useState([])

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
            <img className="user-info__user-photo" src={userAvatar} alt="Аватар"/>
          </div>
          <div className="user-info__about">
              <div className="user-info__edit-wrap">
                <h1 className="user-info__name">{userName}</h1>
                <button className="user-info__edit-icon" onClick={onEditProfile} type="button" aria-label="Редактировать имя"></button>
              </div>
              <p className="user-info__career">{userDescription}</p>
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

import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({name, link, likes, likesCounter, ownerId, cardId, handleCardClick, onCardLike}) {
  const userContext = useContext(CurrentUserContext)

  const isOwn = ownerId === userContext._id
  const isLiked = likes.some(item => item._id === userContext._id)

  function handleClick() {
    handleCardClick({name, link})
  }
  
  function handleLikeClick() {
    onCardLike({cardId, likes})
  }

  return (
    <li className="cards__item">
      <button className={`cards__remove-btn ${isOwn ? '' : 'card__remove-btn_hidden'}`} type="button"></button>
      <img className="cards__photo" onClick={handleClick} src={link} alt={name}/>
      <div className="cards__caption">
        <h2 className="cards__title">{name}</h2>
        <div className="cards__like-wrap">
          <button className={`cards__like-btn ${isLiked ? 'cards__like-btn_active' : ''}`} onClick={handleLikeClick} aria-label="Поставить лайк" type="button"></button>
          <span className="cards__like-counter">{likesCounter}</span>
        </div>
      </div>
    </li>
  )
}

export default Card
import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({name, link, likes, ownerId, handleCardClick}) {
  const userContext = useContext(CurrentUserContext)

  const isOwn = ownerId === userContext._id

  function handleClick() {
    handleCardClick({name, link})
  }  

  return (
    <li className="cards__item">
      <button className={`cards__remove-btn ${isOwn ? '' : 'card__remove-btn_hidden'}`} type="button"></button>
      <img className="cards__photo" onClick={handleClick} src={link} alt={name}/>
      <div className="cards__caption">
        <h2 className="cards__title">{name}</h2>
        <div className="cards__like-wrap">
          <button className="cards__like-btn" aria-label="Поставить лайк" type="button"></button>
          <span className="cards__like-counter">{likes}</span>
        </div>
      </div>
    </li>
  )
}

export default Card
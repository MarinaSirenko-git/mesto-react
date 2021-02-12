function Card({name, link, likes, handleCardClick}) {

  function handleClick() {
    handleCardClick({name, link})
  }  

  return (
    <li className="cards__item">
      <button className="cards__remove-btn" type="button"></button>
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
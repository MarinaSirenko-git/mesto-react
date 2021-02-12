function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_show-image ${card ? 'popup_opened' : ''}`}>
      <figure className="popup__semantic-wrap">
        <button className="popup__close-icon popup__close-icon_place_show-image" onClick={onClose} aria-label="Закрыть" type="button"></button>
        <img className="popup__fullsize-image" src={card ? card.link : ''} alt="Загруженное изображение"/>
        <figcaption className="popup__image-caption">{card ? card.name : ''}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup

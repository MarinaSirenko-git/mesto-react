function PopupWithForm({name, title, isOpen, onClose, onSubmit, children}) {
  return (
      <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <form className="popup__container" name={name} onSubmit={onSubmit}>
          <button className="popup__close-icon" onClick={onClose} aria-label="Закрыть" type="button"></button>
          <h2 className="popup__title">{title}</h2>
          {children}
        </form>
      </div>
  )
}

export default PopupWithForm

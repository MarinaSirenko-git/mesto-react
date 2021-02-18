import PopupWithForm from './PopupWithForm'
import { useState } from 'react'

function AddPlacePopup({isOpen, isLoading, onClose, onAddPlace}){

  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')

  function handleChangeTitle(e) {
    setTitle(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace({
      name: title,
      link: link
    })
  }

  return (
    <PopupWithForm 
      name={'add-image'} 
      title={'Новое место'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input id="photo-title-input" className="popup__input popup__input_type_title" value={title} onChange={handleChangeTitle} type="text" name="title" placeholder="Название" minLength="2" maxLength="30" required/>
      <span id="photo-title-input-error" className="popup__input-error"></span>
      <input id="photo-link-input" className="popup__input popup__input_type_link" value={link} onChange={handleChangeLink} type="url" name="link" placeholder="Ссылка на картинку" required/>
      <span id="photo-link-input-error" className="popup__input-error"></span>
      <button className="popup__btn" type="submit">{isLoading ? 'Сохранение...' : 'Сохранить'}</button>
  </PopupWithForm>
  )
}

export default AddPlacePopup
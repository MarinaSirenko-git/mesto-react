import PopupWithForm from './PopupWithForm'
import { useState, useEffect } from 'react'

function AddPlacePopup({isOpen, isLoading, onClose, onAddPlace}){

  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [invalidTitle, setInvalidTitle] = useState(false)
  const [invalidLink, setInvalidLink] = useState(false)
  const [errorTitle, setErrorTitle] = useState('Поле не может быть пустым')
  const [errorLink, setErrorLink] = useState('Поле не может быть пустым')
  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    if (errorTitle || errorLink) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [errorTitle, errorLink])

  useEffect(() => {
    if(!isOpen) {
      setTitle('')
      setLink('')
    }
  }, [isOpen])

  function handleChangeTitle(e) {
    setTitle(e.target.value)
    if(e.target.value.length < '2') {
      setErrorTitle('Длинна заголовка должна быть не меньше 2-х символов')
    } else {
      setErrorTitle('')
    }
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
    const urlExp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    const regex = new RegExp(urlExp)
    if(!regex.test(String(e.target.value).toLowerCase())) {
      setErrorLink('Введите корректный url')
    } else {
      setErrorLink('')
    }
  }

  const blurHandler = (e) => {
    switch(e.target.name) {
      case 'title': setInvalidTitle(true)
      break
      case 'link': setInvalidLink(true)
      break
    }
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
      <input 
        className="popup__input popup__input_type_title" 
        onBlur={(e) => blurHandler(e)} 
        value={title} 
        onChange={handleChangeTitle}  
        name="title" 
        placeholder="Название"
      />
      {(invalidTitle && errorTitle) && <span className="popup__input-error popup__input-error_active">{errorTitle}</span>}
      <input 
        className="popup__input popup__input_type_link" 
        onBlur={(e) => blurHandler(e)} 
        value={link} 
        onChange={handleChangeLink} 
        name="link" 
        placeholder="Ссылка на картинку"
      />
      {(invalidLink && errorLink) && <span className="popup__input-error popup__input-error_active">{errorLink}</span>}
      <button 
        className="popup__btn popup__btn_inactive" 
        disabled={!formValid} 
        type="submit">
          {isLoading ? 'Сохранение...' : 'Сохранить'}
      </button>
  </PopupWithForm>
  )
}

export default AddPlacePopup
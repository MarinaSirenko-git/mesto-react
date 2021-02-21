import PopupWithForm from './PopupWithForm'
import { useState, useEffect } from 'react'

function EditAvatarPopup({isOpen, isLoading, onClose, onUpdateAvatar}) {

  const [link, setLink] = useState('')
  const [invalidLink, setInvalidLink] = useState(false)
  const [errorLink, setErrorLink] = useState('Поле не может быть пустым')
  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    if (errorLink || link === '') {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [errorLink, link])

  useEffect(() => {
    if(!isOpen) {
      setLink('')
      setInvalidLink(false)
    }
  }, [isOpen])

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
      case 'link': setInvalidLink(true)
      break
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: link,
    })
  }

  return(
    <PopupWithForm 
      name={'user-avatar'} 
      title={'Редактировать аватар'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
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

export default EditAvatarPopup
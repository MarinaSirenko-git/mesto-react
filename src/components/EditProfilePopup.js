import PopupWithForm from './PopupWithForm'
import { useEffect, useState, useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup({isOpen, isLoading, onClose, onUpdateUser}) {
  const userContext = useContext(CurrentUserContext)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [invalidName, setInvalidName] = useState(false)
  const [invalidDescription, setInvalidDescription] = useState(false)
  const [errorName, setErrorName] = useState('')
  const [errorDescription, setErrorDescription] = useState('')
  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    if(!isOpen)
      setName(userContext.name)
  }, [isOpen, userContext])

  useEffect(() => {
    if(!isOpen)
      setErrorName('')
  }, [isOpen, errorName])

  useEffect(() => {
    if(!isOpen)
      setDescription(userContext.about)
  }, [isOpen, userContext])
  
  useEffect(() => {
    if(!isOpen)
      setErrorDescription('')
  }, [isOpen, errorDescription])

  useEffect(() => {
    if(name && description) {
      setFormValid(true)
    }
    else if(errorName || errorDescription) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [errorName, errorDescription, name, description])

  function handleChangeName(e) {
    setName(e.target.value)
    if(e.target.value.length < '2') {
      setErrorName('Имя должно быть не меньше 2-х символов')
    } else if(e.target.value.length > '40') {
      setErrorName('Имя должно быть не больше 40 символов')
    } else {
      setErrorName('')
    }
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
    if(e.target.value.length < '2') {
      setErrorDescription('Описание должно быть не меньше 2-х символов')
    } else if(e.target.value.length > '200') {
      setErrorDescription('Описание должно быть не больше 200 символов')
    } else {
      setErrorDescription('')
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name: name,
      about: description,
    })
  }

  const blurHandler = (e) => {
    switch(e.target.name) {
      case 'name': setInvalidName(true)
      break
      case 'about': setInvalidDescription(true)
      break
    }
  }

  return (
    <PopupWithForm 
      name={'user-info'} 
      title={'Редактировать профиль'}
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input 
        className="popup__input popup__input_type_name" 
        value={name} 
        onChange={handleChangeName}
        onBlur={(e) => blurHandler(e)} 
        name="name" 
      />
      {(invalidName && errorName) && <span className="popup__input-error popup__input-error_active">{errorName}</span>}
      <input 
        className="popup__input popup__input_type_career" 
        value={description} 
        onChange={handleChangeDescription}
        onBlur={(e) => blurHandler(e)} 
        name="about"
      />
      {(invalidDescription && errorDescription) && <span className="popup__input-error popup__input-error_active">{errorDescription}</span>}
      <button 
        className="popup__btn popup__btn_inactive"
        disabled={!formValid}
        type="submit">
          {isLoading ? 'Сохранение...' : 'Сохранить'}
      </button>
    </PopupWithForm>
  )
}

export default EditProfilePopup
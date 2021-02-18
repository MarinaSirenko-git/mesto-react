import PopupWithForm from './PopupWithForm'
import { useEffect, useState, useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup({isOpen, isLoading, onClose, onUpdateUser}) {
  const userContext = useContext(CurrentUserContext)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setName(userContext.name)
    setDescription(userContext.about)
  }, [userContext]) 

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name: name,
      about: description,
    })
  } 

  return (
    <PopupWithForm 
      name={'user-info'} 
      title={'Редактировать профиль'}
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input id="user-name-input" className="popup__input popup__input_type_name" value={name} onChange={handleChangeName} type="text" name="name" minLength="2" maxLength="40" required/>
      <span id="user-name-input-error" className="popup__input-error"></span>
      <input id="user-career-input" className="popup__input popup__input_type_career" value={description} onChange={handleChangeDescription} type="text" name="about" minLength="2" maxLength="200" required/>
      <span id="user-career-input-error" className="popup__input-error"></span>
      <button className="popup__btn" type="submit">{isLoading ? 'Сохранение...' : 'Сохранить'}</button>
    </PopupWithForm>
  )
}

export default EditProfilePopup
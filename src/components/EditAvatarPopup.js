import PopupWithForm from './PopupWithForm'
import { useRef } from 'react'

function EditAvatarPopup({isOpen, isLoading, onClose, onUpdateAvatar}) {
  const avatarRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: avatarRef.current.value,
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
      <input id="user-avatar-input" className="popup__input" ref={avatarRef} type="url" name="link" placeholder="Ссылка на картинку" required/>
      <span id="user-avatar-input-error" className="popup__input-error"></span>
      <button className="popup__btn" type="submit">{isLoading ? 'Сохранение...' : 'Сохранить'}</button>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
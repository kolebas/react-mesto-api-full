import { useRef, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm.js";

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {

  const avatarLink = useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarLink.current.value,
    });
  }
  
  useEffect(() => {
    avatarLink.current.value = "";
  }, [isOpen]); 

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={isOpen }
      onClose={ onClose }
      buttonText="Сохранить" 
      onSubmit={ handleSubmit }
    >
      <input ref={ avatarLink } id="avatar-link" type="url" placeholder="Ссылка на картинку" name="avatar-link" className="popup__input" required /> 
      <span id="avatar-link-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
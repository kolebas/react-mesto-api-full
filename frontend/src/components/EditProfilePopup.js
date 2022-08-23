import { useEffect, useState, useContext } from 'react';
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser,isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }
  
  function handleNameChange(e) {
    setName(e.target.value)
  } 

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  return (
    <PopupWithForm
     title="Редактирование профиля" 
      name="edit-profile"
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
      buttonText="Сохранить"
    >
      <input onChange={ handleNameChange } id="discover" type="text" name="discover" className="popup__input" minLength="2" maxLength="40" value={ name || '' } required />
      <span id="discover-error" className="popup__error"></span>
      <input onChange={ handleDescriptionChange } id="job" type="text" name="job" className="popup__input" minLength="2" maxLength="200" value={ description || '' } required />
      <span id="job-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup
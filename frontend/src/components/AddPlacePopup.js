import { useEffect, useRef } from 'react';
import PopupWithForm from "./PopupWithForm.js";

const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {

  const name = useRef();
  const link = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    
    onAddPlace({
      name: name.current.value,
      link: link.current.value,
    });
  }
  
  useEffect(() => {
    name.current.value = "";
    link.current.value = "";
  }, [isOpen]); 

  return (
    <PopupWithForm
      title="Новое место"
      name="new-card"
      isOpen={isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
      buttonText="Сохранить"
    >
      <input ref={ name } id="title" type="text" placeholder="Название" name="title" className="popup__input" minLength="2" maxLength="30" required/>
      <span id="title-error" className="popup__error"></span>
      <input ref={ link } id="link" type="url" placeholder="Ссылка на картинку" name="link" className="popup__input" required/> 
      <span id="link-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup
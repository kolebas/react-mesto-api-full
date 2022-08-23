import Popup from "./Popup.js";

function PopupWithFrom({title, name, buttonText, children, isOpen, onClose, onSubmit }){
  return(
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h2 className="popup__title">{title}</h2>
      <form className="popup__form" name={name} onSubmit={ onSubmit } noValidate>
        { children }        
        <button className="popup__button " type="submit" aria-label="Save" >{ buttonText }</button>
      </form>
    </Popup>
  )
}

export default PopupWithFrom
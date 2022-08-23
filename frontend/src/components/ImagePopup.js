import Popup from "./Popup.js";

const ImagePopup = ({card, onClose}) => {
    return (
      <Popup
        name="show-card"
        isOpen={ card.link && 'popup_opened'}
        onClose={ onClose }
      >
        
        <img id="card-image" className="popup__image" src={ card.link } alt="Изображение" />
        <h2 id="card-title" className="popup__title popup__title_show-card">{ card.name }</h2>

      </Popup>
    )
}

export default ImagePopup
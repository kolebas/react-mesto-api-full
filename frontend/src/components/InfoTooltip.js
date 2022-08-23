import { useNavigate } from "react-router-dom";
import Popup from "./Popup.js";

const InfoTooltip = ({props, onClose }) => {
  const navigate = useNavigate();
  const status = props.status;
  function handleClick(){
    onClose();
    if(status === 'success'){      
      navigate('/');
    }
  }

  return (
    <Popup
     isOpen={ props.isOpen && 'popup_opened' }
     onClose={ handleClick }
    >
      <div className={`popup__icon ${props.status === 'success' ? 'popup__icon_success' : 'popup__icon_failed'}`}></div>
      <h2 className="popup__title-tooltip">{props.title}</h2>
    </Popup>
  )
}
export default InfoTooltip
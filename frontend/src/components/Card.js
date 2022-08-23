import { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Card = ({ link, name, likes, owner, card, onCardClick, onCardLike, onCardDelete}) => {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_show' : 'card__delete-button_hidden'}`
  );
  
  const isLiked = likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = (
    `card__like-button ${isLiked ? 'card__like-button_active': ''}`
  );

  function handleClick() {
    onCardClick({link, name});
  }

  function handleLikeClick () {
    onCardLike(card);
  }

  function handleCardDelete () {
    onCardDelete(card);
  }

  return (  
    <div className="card">
      <img onClick={ handleClick } className="card__image" src={ link } alt={`Изображение ${name}`}/>
      <button onClick={ handleCardDelete } className={ cardDeleteButtonClassName }></button>
      <div className="card__rectangle">
        <h2 className="card__title">{ name }</h2>
        <div className="card__like-template">
          <button onClick={ handleLikeClick } className={ cardLikeButtonClassName } type="button" aria-label="Like"></button>
          <p className="card__like-counter">{ likes.length }</p>
        </div>  
      </div>
    </div>
  )  
}



export default Card
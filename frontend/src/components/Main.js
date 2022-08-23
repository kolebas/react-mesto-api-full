import { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Main = ({cards, handleCardLike, handleCardDelete, onEditProfile, onAddPlace, onEditAvatar, onCardClick}) => {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile page__profile">
        <div className="discover profile__info">
          <button onClick={ onEditAvatar } className="discover__avatar-edit">
            <img className="discover__avatar" src={ currentUser.avatar } alt="Аватар"/>
          </button>            
          <h1 className="discover__title">{ currentUser.name }</h1>
          <button onClick={ onEditProfile } className="discover__edit-button" type="button" aria-label="OpenProfile" />
          <p className="discover__subtitle">{ currentUser.about }</p>            
        </div>
        <button onClick={ onAddPlace } className="profile__add-button" type="button" aria-label="AddCard"></button>
      </section>  
      <section className="page__cards cards">
        {cards.map((card) => (<Card {...card} key={card._id} card={ card } onCardClick={ onCardClick } onCardLike={ handleCardLike } onCardDelete= { handleCardDelete }/>))}
      </section>
    </main> 
  )
}

export default Main
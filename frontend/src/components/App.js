import "../index.css";
import api from '../utils/api.js';
import auth from '../utils/auth.js';
import Header from "./Header";
import Main from "./Main.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import Footer from "./Footer.js";
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js"; 
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState({isOpen: false});
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setloggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    auth.checkToken().then((res) => {
      if(res.data){
        setloggedIn(true);      
        setEmail(res.data.email);
        navigate('/');
      }      
    })
    .catch((error) => {
      console.log(error)
    })
  }, [navigate]);

  useEffect(() => {
    api.setProfile().then((res) => {
      setCurrentUser(res.data);
    })
    .catch((error) => {
      console.log(error)
    })
  }, []);

function handleUpdateUser(value){
  api.updateUserInfo(value).then((res) => {
    setCurrentUser(res.data);
    closeAllPopups();
  })
  .catch((error) => {
    console.log(error)
  })
}

function handleUpdateAvatar(value){
  api.updateAvatar(value).then((data) => {
    setCurrentUser(data);
    closeAllPopups();
  })
  .catch((error) => {
    console.log(error)
  })
}

function handleRegister(value){
  auth.register('POST', value).then((data) => {    
    setInfoTooltip({
      isOpen: true,
      title: 'Вы успешно зарегистрировались',
      status: 'success'
    });
  })
  .catch((error) => {
    setInfoTooltip({
      isOpen: true,
      title: 'Что-то пошло не так! Попробуйте ещё раз.',
      status: 'failed'
    });
    console.log(error)
  })
}
function handleAutharization(value){
  auth.auth('POST', value).then((data) => {
    const jwt = data.token;
    if(jwt){
      localStorage.setItem('jwt', jwt);
       setloggedIn(true);
       setInfoTooltip({
        isOpen: true,
        title: 'Вы успешно авторизовались!',
        status: 'success'
      });
       setEmail(data.email);
    }
  })
  .catch((error) => {
    setInfoTooltip({
      isOpen: true,
      title: 'Что-то пошло не так! Попробуйте ещё раз.',
      status: 'failed'
    });
    console.log(error)
  })
}

function handleLogOut(){
  localStorage.removeItem('jwt');
  setEmail('');  
  navigate('/sign-in');
}

function handleEditAvatarClick() {
  setEditAvatarPopupOpen(true);
}

function handleEditProfileClick() {
  setIsEditProfilePopupOpen(true);
}

function handleAddPlaceClick() {
  setAddPlacePopupOpen(true)  
}

function closeAllPopups(){
  setEditAvatarPopupOpen(false);
  setIsEditProfilePopupOpen(false);  
  setAddPlacePopupOpen(false);
  setInfoTooltip(false);
  setSelectedCard({});  
}

const [cards, setCards] = useState([]);

useEffect(() => {
  api.getInitialCards().then((res) => {
    const data = res.data
    setCards(
      data.map((item) => ({
        link: item.link,
        name: item.name,
        likes: item.likes,
        _id: item._id,
        key: item._id,
        owner: item.owner,
      }))
    )
  })
  .catch((error) => {
    console.log(error)
  })
}, []);

function handleCardLike(card) {
  const isLiked = card.likes.some(i => i === currentUser._id);
  api.changeLikeCard(!isLiked ? "PUT" : "DELETE", card._id).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  })
  .catch((error) => {
    console.log(error)
  })
}

function handleCardDelete(card) {
  api.deleteCard("DELETE", card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
  })
  .catch((error) => {
    console.log(error)
  })
}

function handleAddPlaceSubmit(card) {
  api.addCard("POST", card).then((newCard) => {
    setCards([newCard.data, ...cards]);    
    closeAllPopups(); 
  })
  .catch((error) => {
    console.log(error)
  })
}

function handleCardClick(card){
  setSelectedCard(card);
}

function onClose(){
  setSelectedCard({}); 
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={ email } handleLogOut={ handleLogOut }/>
        <Routes>          
          <Route exact path='/' element={<ProtectedRoute loggedIn={ loggedIn } />}>
            <Route exact path='/' element={<Main cards={ cards } handleCardLike={ handleCardLike } handleCardDelete={ handleCardDelete } onEditProfile={ handleEditProfileClick } onAddPlace={ handleAddPlaceClick }  onEditAvatar={ handleEditAvatarClick } onCardClick={ handleCardClick } />}/>
          </Route>
          <Route path="/sign-in"  element={ <Login  handleAutharization={ handleAutharization }/> } />
          <Route path="/sign-up" element={ <Register handleRegister={ handleRegister }/> } />
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        </Routes>
        
          <EditProfilePopup isOpen={ isEditProfilePopupOpen } onClose={ closeAllPopups } onUpdateUser={ handleUpdateUser }/> 
          <EditAvatarPopup isOpen={ isEditAvatarPopupOpen } onClose={ closeAllPopups } onUpdateAvatar= { handleUpdateAvatar } />
          <AddPlacePopup isOpen={ isAddPlacePopupOpen } onClose={ closeAllPopups } onAddPlace={ handleAddPlaceSubmit }/>
          <ImagePopup card={ selectedCard } onClose={ onClose } />
          <InfoTooltip props={ isInfoTooltip } onClose={ closeAllPopups } status={ true }/>
          <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}


export default App;

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({email, handleLogOut}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [route, setRoute] = useState({
  });

  function handleClick(){
    navigate(route.path)
  }

  useEffect(() => {
    if(location.pathname === '/sign-in'){
      setRoute({
        title: 'Зарегистрироваться',
        path: '/sign-up'
      })
    } 
    if(location.pathname === '/sign-up'){
      setRoute({
        title: 'Войти',
        path: '/sign-in'
      })
    }
  }, [location.pathname])

  return (
    <header className="header page__header">
      <div className="header__logo"></div>
      { email ? <div className="header__auth"><p className="discover__subtitle">{email}</p><button onClick={ handleLogOut } className="header__button login-button" type="button">Выйти</button></div> : <button onClick={ handleClick } className="header__button login-button" type="button">{route.title}</button> }
    </header>
  )
}

export default Header
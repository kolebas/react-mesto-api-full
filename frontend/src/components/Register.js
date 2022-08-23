import { useRef } from 'react';
import { useNavigate } from "react-router-dom";

const Register = ({ handleRegister }) => {
  const navigate = useNavigate();
  function handleClick(){
    navigate("/sign-in")
  }

  const email = useRef();
  const password = useRef();

  function submit(e){
    e.preventDefault();
    handleRegister({
      "password": password.current.value,
      "email": email.current.value
    })
  }

  return (
      <div className="form">
        <h2 className="form__title">Регистрация</h2>
        <form noValidate onSubmit={ submit }>
          <input ref={ email } id="email" type="email" name="email" className="form__input" minLength="2" maxLength="40" placeholder="Email" required />
          <span id="discover-error" className="popup__error"></span>
          <input ref={ password } id="password" type="password" name="password" className="form__input" placeholder="Пароль" minLength="2" maxLength="200"  required />
          <span id="job-error" className="popup__error"></span>      
          <button className="form__button " type="submit" aria-label="Save" >Зарегистрироваться</button>
          <p className="form__text-info">Уже зарегистрированы? <button onClick={ handleClick } className="login-button">Вoйти</button></p>
        </form>
      </div>
  )
} 

export default Register


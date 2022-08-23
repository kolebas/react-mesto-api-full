import { useRef } from 'react';

const Login = ( {handleAutharization} ) => {

  const email = useRef();
  const password = useRef();

  function submit(e){
    e.preventDefault();
    handleAutharization({
      "password": password.current.value,
      "email": email.current.value
    })
  }

  return (
    <div className="form">
        <h2 className="form__title">Вход</h2>
        <form onSubmit={ submit }>
          <input ref={ email } id="email" type="email" name="email" className="form__input" minLength="2" maxLength="40" placeholder="Email" required />
          <span id="discover-error" className="popup__error"></span>
          <input ref={ password } id="password" type="password" name="password" className="form__input" minLength="2" placeholder="Пароль" maxLength="200"  required />
          <span id="job-error" className="popup__error"></span>      
          <button className="form__button " type="submit" aria-label="Save" >Войти</button>
        </form>
      </div>
  )
} 

export default Login
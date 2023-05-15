import css from './Registration-form.module.css';
// import registrationRequest from '../../Api/requests';
import React, { useState } from 'react';
import axios from 'axios';

function RegistrationForm () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [clientId, setClientId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '' || clientId === '') 
        {
            return(alert('Пожалуйста, заполните все поля'))
        } else {
        axios
        .post('https://sf-final-project-be.herokuapp.com/api/auth/sign_up', { email, password, firstName, lastName, clientId })
        .then((response) => {console.log(response);})
        .catch((error) => {console.error(error);});}
      };

    return (
        <div className={css.RegistrationForm}>
            <form onSubmit={handleSubmit}>
                <div className={css.formText}>
                    Регистрация
                </div>
                <div>
                    <input type="text" placeholder='Введите e-mail' className={css.input} 
                    id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder='Введите пароль' className={css.input} 
                    id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder='Введите имя' className={css.input} 
                    id="name" name="name" value={firstName} onChange={(e) => setfirstName(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder='Введите фамилию' className={css.input} 
                    id="surname" name="surname" value={lastName} onChange={(e) => setlastName(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder='Введите Client ID' className={css.input}
                    id="clientId" name="clientId" value={clientId} onChange={(e) => setClientId(e.target.value)} />
                </div>
                <button type="submit" className={css.registrationButton}>Зарегистрироваться</button>
            </form>
        </div>
    )
}

export default RegistrationForm
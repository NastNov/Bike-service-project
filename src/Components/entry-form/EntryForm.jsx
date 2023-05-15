import css from './EntryForm.module.css';
import React, { useState } from 'react';
import axios from 'axios';

function EntryForm (props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('https://sf-final-project-be.herokuapp.com/api/auth/sign_in', { email, password })
            .then((response) => {localStorage.setItem('token', response.data.data.token); window.location.reload();})
            .catch((error) => {console.error(error);});
      };

    return (
        <div className={css.EntryForm} >
        <form onSubmit={handleSubmit}>
            <div className={css.formText}>
                Вход в систему
            </div>
            <div>
                <input type="text" placeholder='Введите e-mail' className={css.input}
                id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <input type="text" placeholder='Введите пароль' className={css.input}
                id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className={css.entryButton}>Войти</button>
        </form>
        </div>
        ) 
}

export default EntryForm
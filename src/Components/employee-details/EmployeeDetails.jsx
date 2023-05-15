import css from './EmployeeDetails.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function EmployeeDetails () {

    const [item, setItem] = useState({});

    const {id} = useParams();

    useEffect(() => {
        axios
          .get(`https://sf-final-project-be.herokuapp.com/api/officers/${id}`, {
            headers: 
                {Authorization: `Bearer ${localStorage.getItem('token')}` }
               })
          .then((response) => {
               setItem(response.data.data); console.log(response);
             })
          .catch((error) => {
               console.error(error);
             });
        }, [id]);

        function handleChange(event) {
            const fieldName = event.target.name;
            const fieldValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;
          
            setItem((prevItem) => ({
              ...prevItem,
              [fieldName]: fieldValue
            }));
          }

        function handleSave(e) {
        e.preventDefault();
         axios
            .put(`https://sf-final-project-be.herokuapp.com/api/officers/${id}`, item, {
             headers: 
                {Authorization: `Bearer ${localStorage.getItem('token')}` }
             })
            .then((response) => {console.log(response); setItem(response.data.data); window.location.reload();})
            .catch((error) => {console.error(error);});}

    return (
        <div className={css.EmployeeDetails}>
            <form action="" onSubmit={handleSave}>
                <div className={css.headerDetails}>
                    <h2 className={css.text}>
                        Ответственный сотрудник
                    </h2>
                    <NavLink to="/employee-list" className={css.backLink}>&#10006;</NavLink>
                </div>
                    <div className={css.formElement}>
                        <label htmlFor="email" className={css.label}>Email сотрудника:</label>
                        <input name="email" type="string" defaultValue={item.email || ''} readOnly={true} className={css.input} />
                    </div>
                    <div className={css.formElement}>
                        <label htmlFor="firstName" className={css.label}>Имя сотрудника:</label>
                        <input name="firstName" type="string" value={item.firstName || ''} onChange={handleChange} className={css.input} />
                    </div>
                    <div className={css.formElement}>
                        <label htmlFor="lastName" className={css.label}>Фамилия сотрудника:</label>
                        <input name="lastName" type="string" value={item.lastName || ''} onChange={handleChange} className={css.input}/>
                    </div>
                    <div className={css.formElement}>
                        <label htmlFor="password" className={css.label}>Пароль:</label>
                        <input name="password" type="string" value={item.password || ''} onChange={handleChange} className={css.input}/>
                    </div>
                    <div className={css.formElement}>
                        <label htmlFor="clientId" className={css.label}>Client Id:</label>
                        <input name="clientId" type="string" defaultValue={item.clientId || ''} readOnly={true} className={css.input} />
                    </div>
                    <div className={css.formElement}>
                        <label htmlFor="approved" className={css.label}>Статус сотрудника:</label>
                        <div className={css.checkbox}>
                            <p className={css.approved}>Одобрен</p>
                            <input name="approved" type="checkbox" checked={item.approved || false} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className={css.buttonElement}>
                        <button className={css.button} type="submit">
                            Сохранить
                        </button>
                    </div>
                </form>
        </div>
    )
}

export default EmployeeDetails
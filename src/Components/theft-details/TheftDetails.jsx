import css from './TheftDetails.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function TheftDetails (props) {

    const [item, setItem] = useState({});

    const {id} = useParams();

    useEffect(() => {
        axios
          .get(`https://sf-final-project-be.herokuapp.com/api/cases/${id}`, {
            headers: 
                {Authorization: `Bearer ${localStorage.getItem('token')}` }
               })
          .then((response) => { const formattedItem = formatItem(response.data.data);
               setItem(formattedItem); console.log(response);
             })
          .catch((error) => {
               console.error(error);
             });
        }, [id]);

        function handleChange(event) {
            const fieldName = event.target.name;
            const fieldValue = event.target.value;
          
            setItem((prevItem) => ({
              ...prevItem,
              [fieldName]: fieldValue
            }));
          }

        function handleSave(e) {
            e.preventDefault();
            axios
            .put(`https://sf-final-project-be.herokuapp.com/api/cases/${id}`, item, {
                headers: 
                    {Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
            .then((response) => {console.log(response); setItem(response.data.data); window.location.reload();})
            .catch((error) => {console.error(error);});
            
        }

        function formatItem(item) {
          const formattedItem = { ...item };
          if (item.date) {
              formattedItem.date = new Date(item.date).toLocaleDateString();
            }
          if (item.createdAt) {
            formattedItem.createdAt = new Date(item.createdAt).toLocaleDateString();
          }
          if (item.updatedAt) {
            formattedItem.updatedAt = new Date(item.updatedAt).toLocaleDateString();
          }
        
          return formattedItem;
        }

        const [officers, setOfficer] = useState([]);

        useEffect(() => {
            axios
              .get('https://sf-final-project-be.herokuapp.com/api/officers/', {
                headers: 
                    {Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
              .then(response => {
                const approvedOfficer = response.data.officers.filter(officer => officer.approved);
                setOfficer(approvedOfficer);
                console.log(response);
              })
              .catch(error => console.log(error));
          }, []);

    return (
        <div className={css.TheftDetails}>
            <form action="" onSubmit={handleSave}>
                    <div className={css.headerDetails}>
                        <h2 className={css.text}>
                            Детали сообщения о краже
                        </h2>
                        <NavLink to="/theft-list" className={css.backLink}>&#10006;</NavLink>
                    </div>
                    <div className={css.formElement}>
                        <label htmlFor="status" className={css.label}>Статус сообщения:</label>
                        <select name="status" className={css.input} value={item.status || ''} onChange={handleChange}>
                            <option value="new">Новое</option>
                            <option value="in_progress">В процессе обработки</option>
                            <option value="done">Обработано</option>
                        </select>
                    </div>
                    <div className={css.formElement}>
                        <label htmlFor="licenseNumber" className={css.label}>Номер лицензии:</label>
                        <input name="licenseNumber" type="string" value={item.licenseNumber || ''} onChange={handleChange} className={css.input} />
                    </div>
                    <div className={css.formElement}>
                        <label htmlFor="type" className={css.label}>Тип велосипеда:</label>
                        <select name="type" className={css.input} value={item.type || ''} onChange={handleChange}>
                            <option value="general">Городской</option>
                            <option value="sport">Спортивный</option>
                        </select>
                    </div>
                    <div className={css.formElement}>
                        <label htmlFor="ownerFullName" className={css.label}>ФИО пользователя:</label>
                        <input name="ownerFullName" type="string" value={item.ownerFullName || ''} onChange={handleChange} className={css.input}/>
                    </div>
                    <div className={css.formElement}>
                        <label htmlFor="createdAt" className={css.label}>Дата создания сообщения:</label>
                        <input name="createdAt" type="string" defaultValue={item.createdAt || ''} readOnly={true} className={css.input} />
                    </div>
                    <div className={css.formElement}>
                        <label htmlFor="updatedAt" className={css.label}>Дата последнего обновления:</label>
                        <input name="updatedAt" type="string" defaultValue={item.updatedAt || ''} readOnly={true} className={css.input} />
                    </div>
                    <div className={css.formElement}>
                        <label htmlFor="color" className={css.label}>Цвет велосипеда:</label>
                        <input name="color" type="string" value={item.color || ''} onChange={handleChange} className={css.input} />
                    </div>
                    <div className={css.formElement}>
                        <label htmlFor="date" className={css.label}>Дата кражи:</label>
                        <input name="date" type="string" value={item.date || ''} onChange={handleChange} className={css.input} />
                    </div>
                    <div className={css.formElement}>
                        <label htmlFor="officer" className={css.label}>Ответственный сотрудник:</label>
                        <select type="string" name="officer" className={css.input}
                        id="officer" value={item.officer || ''} onChange={handleChange}>
                            <option >Выберите сотрудника</option>
                            {officers.map(officer => (
                            <option key={officer._id} value={officer._id}> {officer.firstName} {officer.lastName} </option>
                            ))}
                        </select>
                    </div>
                    <div className={css.formElement}>
                        <label htmlFor="description" className={css.label}>Дополнительная информация:</label>
                        <textarea name="description" type="string" value={item.description || ''} onChange={handleChange} className={css.input} />
                    </div>
                    <div className={css.formElement}>
                        <label htmlFor="resolution" className={css.label}>Итоговый комментарий:</label>
                        <textarea name="resolution" type="string" value={item.resolution || ''} onChange={handleChange} className={css.input} />
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

export default TheftDetails
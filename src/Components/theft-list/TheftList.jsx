import css from './TheftList.module.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


function TheftList (props) {
    
     const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    function getData () {axios
        .get('https://sf-final-project-be.herokuapp.com/api/cases/', {
            headers: 
                {Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
        .then((response) => {console.log(response); setData(response.data.data);})
        .catch((error) => {console.error("Доступ только для авторизованных пользователей");});}

    function handleDelete (id) {
         axios
          .delete(`https://sf-final-project-be.herokuapp.com/api/cases/${id}`, {
            headers: 
                {Authorization: `Bearer ${localStorage.getItem('token')}` }
            } )
          .then((response) => {
             const updatedData = data.filter((item) => item._id !== id);
             setData(updatedData); console.log(response);
           })
           .catch((error) => {
             console.error(error);
           });
      }

      function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1, потому что месяцы в JavaScript начинаются с 0
        const year = date.getFullYear().toString();
      
        return `${day}.${month}.${year}`;
      }

    return (
            
        <div className={css.TheftList}>
            {Object.values(data).map((item) => {
                return (
                    <div className={css.theftListElement} key={item._id}>
                        <p className={css.dateOfTheft}>{formatDate(item.date)}</p>
                        <div>
                            <NavLink to={`/theft-details/${item._id}`}><button className={css.infoButton}>Подробнее</button></NavLink>
                            <button className={css.deleteButton} onClick={() => handleDelete(item._id)}>Удалить</button>
                        </div>
                    </div>)})}
        </div>)
    
}

export default TheftList
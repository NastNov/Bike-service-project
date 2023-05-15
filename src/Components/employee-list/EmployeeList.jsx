import css from './EmployeeList.module.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function EmployeeList () {

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    function getData () {
        axios
        .get('https://sf-final-project-be.herokuapp.com/api/officers/', {
            headers: 
                {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
        .then((response) => {console.log(response); setData(response.data.officers);})
        .catch((error) => {console.error(error);});}

        function handleDelete (id) {
            axios
             .delete(`https://sf-final-project-be.herokuapp.com/api/officers/${id}`, { 
               headers: 
                   {Authorization: `Bearer ${localStorage.getItem('token')}` }
               } )
             .then((response) => {
                const updatedData = data.filter((item) => item._id !== id);
                setData(updatedData);
              })
              .catch((error) => {
                console.error(error);
              });
         }

    return (
        <div className={css.employeeList}>
            {Object.values(data).map((item) => {
                return (<div className={css.employeeElement} key={item._id}>
                <p className={css.name}>{item.firstName + " " + item.lastName}</p>
                <div>
                    <NavLink to={`/employee-details/${item._id}`}><button className={css.infoButton}>Подробнее</button></NavLink>
                    <button className={css.deleteButton} onClick={() => handleDelete(item._id)}>Удалить</button>
                </div>
            </div>);})}
        </div>
    );
}

export default EmployeeList
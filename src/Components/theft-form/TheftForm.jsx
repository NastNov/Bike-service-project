import css from './TheftForm.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function TheftForm (props) {

    const {isAuthenticated} = props;

    const [licenseNumber, setLicenseNumber] = useState('');
    const [ownerFullName, setOwnerFullName] = useState('');
    const [type, setType] = useState('');
    const [clientId, setClientId] = useState('');
    const [color, setColor] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const [officers, setOfficer] = useState([]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (licenseNumber === '' || ownerFullName === '' || type === '') 
            {
                return (alert('Пожалуйста, заполните все поля'))
            } else {
            axios
            .post('https://sf-final-project-be.herokuapp.com/api/public/report', { licenseNumber, ownerFullName, type, clientId, color, date, description })
            .then((response) => {console.log(response.data)})
            .catch((error) => {console.error(error);});}
        window.location.reload();
      };

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
        <div className={css.theftForm} >
                <form onSubmit={handleSubmit} >
                    <h2 className={css.formText}>
                        Сообщить о краже
                    </h2>
                    <div >
                        <input type="string" name="licenseNumber" placeholder="Номер лицензии" className={css.input}
                        id="licenseNumber" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />
                    </div>
                    <div>
                        <input type="string" name="ownerFullName" placeholder="ФИО клиента" className={css.input}
                        id="ownerFullName" value={ownerFullName} onChange={(e) => setOwnerFullName(e.target.value)} />
                    </div>
                    <div>
                        <select type="string" name="type" className={css.inputSelect}
                        id="type" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="choose">Выбрать тип велосипеда</option>
                            <option value="general">Городской</option>
                            <option value="sport">Спортивный</option>
                        </select>
                    </div>
                    <div>
                        <input type="string" name="clientId" placeholder="Client ID" className={css.input}
                        id="clientId" value={clientId} onChange={(e) => setClientId(e.target.value)}/>
                    </div>
                    <div>
                        <input type="string" name="color" placeholder="Цвет велосипеда" className={css.input}
                        id="color" value={color} onChange={(e) => setColor(e.target.value)}/>
                    </div>
                    <div>
                        <input type="string" name="date" placeholder="Дата кражи" className={css.input}
                        id="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                    </div>
                    {isAuthenticated && (
                    <div>
                        <select type="string" name="officer" className={css.inputSelect}
                        id="officer" value={officers} onChange={(e) => setOfficer(e.target.value)}>
                            <option value="">Выберите сотрудника</option>
                            {officers.map(officer => (
                            <option key={officer.id} value={officer.id}> {officer.firstName} {officer.lastName} </option>
                            ))}
                        </select>
                    </div>
                    )}
                    <div>
                        <textarea type="string" name="description" placeholder="Дополнительная информация" className={css.input} 
                        id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div>
                        <button type="submit" className={css.button}>
                            Сообщить
                        </button>
                    </div>
                </form>
            </div>
    )

};

export default TheftForm
import css from './Main.module.css';
import {Route, Routes} from 'react-router-dom';
import TheftList from '../theft-list/TheftList.jsx';
import EmployeeList from '../employee-list/EmployeeList.jsx';
import Home from '../home/Home.jsx';
import EntryForm from '../entry-form/EntryForm.jsx';
import RegistrationForm from '../registration-form/RegistrationForm.jsx';
import TheftDetails from '../theft-details/TheftDetails';
import EmployeeDetails from '../employee-details/EmployeeDetails';

function Main(props) {

    const {isAuthenticated} = props;

    return (
        <main className={css.main}>
            <Routes>
                <Route path="/" element={<Home isAuthenticated = {isAuthenticated}/>}/>
                <Route path="/theft-list" element={isAuthenticated ? <TheftList /> : <EntryForm />}/>
                <Route path="/employee-list" element={isAuthenticated ? <EmployeeList /> : <EntryForm />}/>
                <Route path="/entry" element={<EntryForm isAuthenticated = {isAuthenticated}/>}/>
                <Route path="/registration" element={<RegistrationForm/>}/>
                <Route path="/theft-details/:id" element={isAuthenticated ? <TheftDetails /> : <EntryForm />}/>
                <Route path="/employee-details/:id" element={isAuthenticated ? <EmployeeDetails /> : <EntryForm />}/>
            </Routes>
        </main>
    )

};

export default Main
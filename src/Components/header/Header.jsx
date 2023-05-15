import {NavLink} from 'react-router-dom';
import css from './Header.module.css';
import Avatar from '../../Assets/user-avatar.svg';
import Line from '../../Assets/line.svg';

function Header(props) {

	const {isAuthenticated} = props;

	function handleLogout() {
		localStorage.removeItem('token');
		window.location.reload();
	  }

	return (
		<header className={css.header}>
			<div className={css.menu}>
				<div className={css.menuItem}><NavLink to="/" className={css.main}>Главная</NavLink></div>
				<div className={css.menuItem}><NavLink to="/theft-list" className={css.theft}>Сообщения о краже</NavLink></div>
				<div className={css.menuItem}><NavLink to="/employee-list" className={css.employees}>Сотрудники</NavLink></div>
			</div>
			{isAuthenticated ? 
			(<div onClick={handleLogout} className={css.logOutButton}>Выйти из аккаунта</div>) :
			(<div className={css.user}>
					<NavLink to="/entry"><img className={css.avatar} src={Avatar} alt='user avatar'/></NavLink>
					<div>
						<div><NavLink to="/entry" className={css.entry}>Войти</NavLink></div>
						<img className={css.line} src={Line} alt='line'/>
						<div><NavLink to="/registration" className={css.registration}>Зарегистрироваться</NavLink></div>
					</div>
			</div>)}
		</header>
	)
};

export default Header
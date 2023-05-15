import css from './Home.module.css';
import Bike from '../../Assets/bicycle.svg';
import TheftForm from '../theft-form/TheftForm';

function Home (props) {

    const {data} = props;

    return (

        <div className={css.homePage}>
            <div className={css.mobileImage}>
                <img className={css.mobileBike} src={Bike} alt='bicycle'/>
            </div>
            <div className={css.mainText}>
                <h1 className={css.service}>Сервис проката {"\n"}велосипедов</h1>
                <p className={css.description}>Здесь вы можете сообщить о краже {"\n"}велосипеда</p>
            </div>
            <div className={css.mainImage}>
                <img className={css.bike} src={Bike} alt='bicycle'/>
            </div>
            <TheftForm data={data}/>
        </div>
    )
}


export default Home
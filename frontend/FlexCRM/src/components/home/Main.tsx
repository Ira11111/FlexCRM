import img from "../../assets/home_img.svg";
import {useNavigate} from "react-router-dom";

function Main() {
    const navigate = useNavigate();

    return (
        <div className={'home__main'}>

            <div className='description__wrapper'>
                    <span>
                    <h1 className='home__title animated-text-effect'>FlexCRM</h1>
                    <p className='home__descr'>Современная флексабельная CRM-система для вашего флексабельного бизнеса</p>
                    </span>
                <div className='home__buttons-wrapper'>
                    <button className='home__button' onClick={() => navigate('/login')}>Войти</button>
                    <button className='home__button' onClick={() => navigate('/register')}>Зарегистрироваться</button>
                </div>
            </div>
            <img alt={'женщина говорит FlexCRM'} className={'home__picture'} src={img}/>
        </div>
    );
}

export default Main;
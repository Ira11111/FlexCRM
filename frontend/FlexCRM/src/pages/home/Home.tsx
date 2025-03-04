import { useNavigate } from 'react-router-dom';
import './home.css'


function Home() {
    const navigate = useNavigate();
    return (
        <div className='home'>
                <div className='home__buttons-wrapper'>
                    <button className='button' onClick={() => navigate('/login')}>Войти</button>
                    <button className='button' onClick={() => navigate('/register')}>Зарегистрироваться</button>
                </div>

            <div className='description-wrapper'>
                <h1 className='home__title'>FlexCRM</h1>
                <p className='home__descr'>Современная CRM-система, разработанная для того, чтобы помочь вашему бизнесу стать более эффективным, организованным и прибыльным. Независимо от того, являетесь ли вы небольшим стартапом или крупной компанией, FlexCRM предоставляет все необходимые инструменты для управления клиентами, продажами, проектами и аналитикой.</p>
            </div>



            <h2 className='home__list-title'>Почему выбирают FlexCRM?</h2>
            <ul className='home__list'>
                <li className='home__list-item'>
                    <h3>Централизованное управление клиентами</h3>
                    <p>Храните всю информацию о ваших клиентах в одном месте.</p>
                </li>
                <li className='home__list-item'>
                    <h3>Удобство и простота</h3>
                    <p>Интуитивно понятный интерфейс позволяет быстро освоить систему и начать работу без длительного обучения.</p>
                </li>
                <li className='home__list-item'>
                    <h3>Аналитика и отчёты</h3>
                    <p>Получайте детальные отчёты о продажах, эффективности сотрудников и ключевых показателях бизнеса.</p>
                </li>

            </ul>


        </div>
    );
}

export default Home;
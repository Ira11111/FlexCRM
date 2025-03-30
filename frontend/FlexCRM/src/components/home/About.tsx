import logo from '../../assets/crmLogo.svg'

function About() {
    return (
        <main className={'about__main'}>
            <img alt={''} src={logo} className={'home__logo'}/>
            <h1 className='home__title'>Почему выбирают FlexCRM?</h1>
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
        </main>
    );
}

export default About;
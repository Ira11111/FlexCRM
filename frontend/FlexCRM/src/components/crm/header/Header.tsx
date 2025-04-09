import './header.css'
import {Link, useNavigate} from "react-router-dom";
import logo from '../../../../public/crmLogo.png'
import ThemeToggle from "../../theme-toggle/ThemeToggle.tsx";
import { ROLE } from '../../../constants';

function Header(){
    const role_prm = localStorage.getItem(ROLE) === "Admins";
    const navigate = useNavigate();
    return <>
        <header className='header'>
            <nav className='header__nav'>

            <img onClick={()=>{navigate('/crm')}} className='header__logo' src={logo} alt='на главную'/>
                <h2 className='header__nav-title '>Меню</h2>
                <ul className='header__list'>
                    <li className='header__list-item'>
                        <Link to='customers' className='header__list-item-link'>Клиенты</Link>
                    </li>
                    <li className='header__list-item'>
                        <Link to='ads' className='header__list-item-link'>Рекламные кампании</Link>
                    </li>
                    <li className='header__list-item'>
                        <Link to='products' className='header__list-item-link'>Услуги</Link>
                    </li>
                    <li className='header__list-item'>
                        <Link to='contracts' className='header__list-item-link'>Контракты</Link>
                    </li>
                    {role_prm && <li className='header__list-item'>
                        <Link to='users' className='header__list-item-link'>Работники</Link>
                    </li>}
                </ul>
            </nav>

            <button className='header__logout-button button' onClick={()=>navigate('/logout')}>Выйти</button>
            <ThemeToggle/>
        </header>
    </>
}

export default Header;
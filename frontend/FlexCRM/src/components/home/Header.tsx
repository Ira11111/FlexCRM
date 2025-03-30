import logo from "../../../public/crmLogo.png";
import {Link} from "react-router-dom";
import {useState} from "react";
import ThemeToggle from "../theme-toggle/ThemeToggle.tsx";

function Header() {
    const [active, setActive] = useState(1);
    return (
        <header className={'home__header'}>
                <nav className={'home__header-nav'}>
                    <img className={'home__header-logo'} alt={'logo'} src={logo}/>
                    <Link className={`home__header-link ${active==1 && 'active'}`} to={'/'}
                          onClick={()=>setActive(1)}>Главная</Link>
                    <Link className={`home__header-link ${active==0 && 'active'}`}
                          onClick={()=>setActive(0)} to={'/about'}>О нас</Link>
                </nav>
                <ThemeToggle/>
        </header>
    );
}

export default Header;
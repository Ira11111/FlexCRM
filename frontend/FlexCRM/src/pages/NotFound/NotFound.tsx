import './notFound.css'
import logo from '../../assets/crmLogo.svg'
import {Link, useNavigate} from "react-router-dom";


function NotFound() {
    const navigate = useNavigate();
    return (
        <div className='notFound'>
            <Link to='/' className='notFound__link'>
                <img src={logo} alt="crmLogo" />
            </Link>
            <h1 className='notFound__title'>404</h1>
            <p className='notFound__descr'>Запрашиваемая вами страница не найдена</p>
            <button className='button' onClick={()=>navigate('/crm')}>На главную</button>

        </div>
    );
}

export default NotFound;
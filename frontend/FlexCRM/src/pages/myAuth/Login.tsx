import {FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../constants.ts";
import axios from "axios";
import Loader from "../../components/Loader/Loader.tsx";
import './auth.css'
import Svglogo from "../../assets/crmLogo.svg";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true);
            const res = await axios.post('/auth/login', {username, password})
            localStorage.setItem(ACCESS_TOKEN, res.data.access)
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
            navigate('/statistic')
        }
        catch (e) {
            alert(e);
        }finally {
            setLoading(false);
        }
    }

    return (
        <div className='auth'>
            <Link className='auth-form__link' to='/'><img className='auth-form__logo' src={Svglogo} alt={'Лого'}/></Link>
            <div className='auth-form__wrapper'>
                <form className='auth-form' onSubmit={handleSubmit} method="post">
                    <h1 className='auth-form__title'>Вход</h1>
                    <label hidden={true} htmlFor="username">Имя пользователя</label>
                    <input className='auth-form__input' required id={"username"} placeholder='Введите имя пользователя'
                           type='text' value={username}
                           onChange={(e)=> setUsername(e.target.value)}/>
                    <label hidden={true} htmlFor="password">Пароль</label>
                    <input className='auth-form__input' required id={"password"} placeholder='Введите пароль' type='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <button className='auth-form__button button' type={"submit"} >Войти</button>
                    <p className='auth-form__descr'>Нет аккаунта? <Link className='auth-form__link' to='/register'>Зарегистрироваться</Link></p>
                </form>
            </div>
            {loading && <Loader/>}
        </div>
    );
}

export default Login;
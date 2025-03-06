import {FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../constants.ts";
import api from '../../api.ts'
import Loader from "../../components/Loader/Loader.tsx";
import './auth.css'
import Svglogo from "../../assets/crmLogo.svg";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [correctData, setCorrectData] = useState(true);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true);
            const resTokens = await api.post('/auth/token/obtain/', {username, password})
            localStorage.setItem(ACCESS_TOKEN, resTokens.data.access)
            localStorage.setItem(REFRESH_TOKEN, resTokens.data.refresh)
            navigate('/crm')
        }
        catch (e : any) {
            if (e.response.data.detail.startsWith('No active account found')) {
                setCorrectData(false)
            }
        }finally {
            setLoading(false);
        }
    }

    return (
        <div className='auth'>
            <Link className='link' to='/'><img className='auth-form__logo' src={Svglogo} alt={'Лого'}/></Link>
            <div className='auth-form__wrapper'>
                <form className='auth-form' onSubmit={handleSubmit} method="post">
                    <h1 className='auth-form__title'>Вход</h1>
                    <label hidden={true} htmlFor="username">Имя пользователя</label>
                    <input className='input' required id={"username"} placeholder='Введите имя пользователя'
                           type='text' value={username}
                           onChange={(e)=> setUsername(e.target.value)}/>
                    <label hidden={true} htmlFor="password">Пароль</label>
                    <input className='input' required id={"password"} placeholder='Введите пароль' type='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    {!correctData && <p className='error-message'>Неверное имя пользователя или пароль😈</p>}
                    <button className='auth-form__button button' type={"submit"} >Войти</button>
                    <p className='auth-form__descr'>Нет аккаунта? <Link className='link' to='/register'>Зарегистрироваться</Link></p>
                </form>
            </div>
            {loading && <Loader/>}
        </div>
    );
}

export default Login;
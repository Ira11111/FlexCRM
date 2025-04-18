import {FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Loader from "../../components/Loader/Loader.tsx";
import './auth.css'
import Svglogo from "../../assets/crmLogo.svg";
import {getTokens} from "../../fetchData.ts";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [correctData, setCorrectData] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true);
            await getTokens({username, password});
            navigate('/crm')
        }
        catch (e : any) {
            console.log(e)
            if (e.response.data.detail.startsWith('No active account found')) {
                setCorrectData(false)
            }
        }finally {
            setLoading(false);
        }
    }

    return (
        <div className='auth'>
            <div className={'auth-form__logo-wrapper'}>
                <Link className='link' to='/'><img className='auth-form__logo' src={Svglogo} alt={'Лого'}/></Link>
            </div>
            <div className='auth-form__wrapper'>

                <form className='auth-form' onSubmit={handleSubmit} method="post">
                    <h1 className='auth-form__title'>Вход</h1>
                    <label hidden={true} htmlFor="username">Имя пользователя</label>
                    <input className='input' required id={"username"} placeholder='Введите имя пользователя'
                           type='text' value={username}
                           onChange={(e)=> setUsername(e.target.value)}/>
                    <label hidden={true} htmlFor="password">Пароль</label>
                    <input className='input' required id={"password"} placeholder='Введите пароль' type={showPassword?"text":'password'} value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <label className='pseudo-checkbox__label' htmlFor="active">
                        <input className='checkbox input visually-hidden'  id={"active"}
                               type='checkbox' checked={showPassword}
                               onChange={()=> setShowPassword(!showPassword)}/>
                        <span className='pseudo-checkbox'></span>
                        <span className='checkbox__text'>Показать пароль</span>
                    </label>
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
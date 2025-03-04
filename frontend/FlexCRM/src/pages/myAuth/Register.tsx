import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Loader from "../../components/Loader/Loader.tsx";
import Svglogo from "../../assets/crmLogo.svg";
import './auth.css'
import api from '../../api.ts'
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../constants.ts";


function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setcPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== cpassword) {
            alert('Пароли не совпадают!')
        }
        else {
            setLoading(true);
            try {
                const res = await api.post('/auth/register/', {username, password, email})
                const resTokens = await api.post('/auth/token/obtain/', {username, password})
                localStorage.setItem(ACCESS_TOKEN, JSON.stringify(resTokens.data.access))
                localStorage.setItem(REFRESH_TOKEN, JSON.stringify(resTokens.data.refresh))
                console.log(resTokens.data)
                navigate('/crm')
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false);
            }
        }
    }
    return (
        <div className='auth'>
            <Link className='link' to='/'><img className='auth-form__logo' src={Svglogo} alt={'Лого'}/></Link>
            <div className='auth-form__wrapper'>
                <form className='auth-form' onSubmit={handleSubmit} method="post">
                    <h1 className='auth-form__title'>Регистрация</h1>

                    <label hidden={true} htmlFor='username'>Имя пользователя</label>
                    <input className='input' required={true} id='username' type='text'  placeholder='Введите имя пользователя'
                           onChange={(e)=> setUsername(e.target.value)}/>

                    <label hidden={true} htmlFor='email'>Электронная почта</label>
                    <input className='input' required={true} id='email' type='email' name='email' placeholder='Введите электронную почту'
                           onChange={(e)=> setEmail(e.target.value)}/>

                    <label hidden={true} htmlFor="password">Пароль</label>
                    <input className='input' required minLength={8} id={"password"} placeholder='Введите пароль' type='password' value={password}
                           onChange={(e)=> setPassword(e.target.value)}/>

                    <label hidden={true} htmlFor="cpassword">Повторите пароль</label>
                    <input className='input' required minLength={8} id={"cpassword"} placeholder='Введите пароль еще раз' type='password' value={cpassword}
                           onChange={(e)=> setcPassword(e.target.value)}/>
                    {cpassword!==''  && cpassword !== password && <p>Пароли не совпадают</p>}
                    <button className='auth-form__button button' type="submit">Зарегистрироваться</button>
                </form>
                <p className='auth-form__descr'>Уже есть аккаунт? <Link className='link' to='/login'>Войти</Link></p>
            </div>
            {loading && <Loader/>}

        </div>
    );
}

export default Register;
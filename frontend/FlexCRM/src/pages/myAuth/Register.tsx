import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Loader from "../../components/Loader/Loader.tsx";
import Svglogo from "../../assets/crmLogo.svg";
import './auth.css'

import {ACCESS_TOKEN, REFRESH_TOKEN, ROLE} from "../../constants.ts";
import {jwtDecode} from "jwt-decode";
import {post} from "../../fetchData.ts";


function Register(props: {mode: string}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setcPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState('Admins')
    const navigate = useNavigate();
    const [dataIsCorrect, setDataIsCorrect] = useState('')

    const actionTitle = props.mode !== 'register' ? 'Добавить работника' : 'Регистрация'
    const action = props.mode !== 'register' ? 'Добавить' : 'Зарегистрироваться'

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== cpassword) {
            setDataIsCorrect('Пароли не совпадают')
        }
        else {
            setLoading(true);
            try {
                if (props.mode === 'register'){
                    localStorage.clear()
                    await post('/auth/register/', {username, password, email, user_group: role});
                    }
                else {
                    await post('/auth/users/', {username, password, email, user_group: role})
                }
                if (props.mode==='register'){
                    const resTokens = await post('/auth/token/obtain/', {username, password})
                    localStorage.setItem(ACCESS_TOKEN, resTokens.data.access);
                    localStorage.setItem(REFRESH_TOKEN, resTokens.data.refresh);
                    localStorage.setItem(ROLE, jwtDecode(resTokens.data.access).user_group)
                }
            } catch (e : any){
                if ( e.response.data.username && e.response.data.username.indexOf('A user with that username already exists.' )!==-1) {
                    setDataIsCorrect('Пользователь с таким именем уже существует😈')

                }
                if (e.response.data.detail && e.response.data.detail === 'User with this email already exists') {
                    setDataIsCorrect('Пользователь с такой электронной почтой уже существует😈')
                }


            } finally {
                setLoading(false);
                navigate('/crm');

            }
        }
    }
    return (
        <div className='auth'>
            {props.mode==='register' && <Link className='link' to='/'><img className='auth-form__logo' src={Svglogo} alt={'Лого'}/></Link>}
            <div className='auth-form__wrapper'>
                <form className='auth-form' onSubmit={handleSubmit} method="post">
                    <h1 className='auth-form__title'>{actionTitle}</h1>

                    <label hidden={true} htmlFor='username'>Имя пользователя</label>
                    <input className='input' required={true} id='username' type='text'  placeholder='Введите имя пользователя'
                           onChange={(e)=> setUsername(e.target.value)}/>

                    <label hidden={true} htmlFor='email'>Электронная почта</label>
                    <input className='input' required={true} id='email' type='email' name='email' placeholder='Введите электронную почту'
                           onChange={(e)=> setEmail(e.target.value)}/>
                    {
                        props.mode==='create' &&
                        <>
                        <label  hidden={true} htmlFor='role'>Роль работника</label>
                        <select  className={'select'} id='role' required onChange={(e)=>{setRole(e.target.value)} }>
                            <option className={'select__option'} value={'Admins'}>Администратор</option>
                            <option className={'select__option'} value={'Managers'}>Менеджер</option>
                            <option className={'select__option'} value={'Marketers'}>Маркетолог</option>
                            <option className={'select__option'} value={'Operators'}>Оператор</option>
                        </select>
                        </>
                    }
                    <label hidden={true} htmlFor="password">Пароль</label>
                    <input className='input' required minLength={8} id={"password"} placeholder='Введите пароль' type='password' value={password}
                           onChange={(e)=> setPassword(e.target.value)}/>

                    <label hidden={true} htmlFor="cpassword">Повторите пароль</label>
                    <input className='input' required minLength={8} id={"cpassword"} placeholder='Введите пароль еще раз' type='password' value={cpassword}
                           onChange={(e)=> setcPassword(e.target.value)}/>
                    <p className='error-message'>{dataIsCorrect}</p>
                    <button className='auth-form__button button' type="submit">{action}</button>
                </form>
                {props.mode==='register' && <p className='auth-form__descr'>Уже есть аккаунт? <Link className='link' to='/login'>Войти</Link></p>}
            </div>
            {loading && <Loader/>}

        </div>
    );
}

export default Register;
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../Loader/Loader.tsx";
import {FormEvent, useState} from "react";
import api from "../../../api.ts";

function CustomerForm() {
    const [loading, setLoading] = useState(false);
    const [isActive, setIsActive] = useState<boolean>(true);
    const [name, setName] = useState("");
    const params  = useParams();
    const editMode = params.customerId;
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();


    async function handleSubmitCustomer(e:FormEvent) {
        e.preventDefault();
        try{
            setLoading(true);
            const res = await api.post('api/leads/', {first_name, last_name, phone, email})
            const lead = res.data.id;
            await api.post('/api/customers/', {name, lead, isActive})
        }catch (e){
            console.log(e);
        }
        finally {
            setLoading(false);
            navigate(-1)
        }

    }

    return (
        <div className="wrapper">

            {loading && <Loader/>}
            <h1 className='title'>{editMode?'Редактировать':'Создать'} клиента</h1>
            <form className='crm-form' onSubmit={handleSubmitCustomer} method="post">
                <label hidden={true} htmlFor="name">Название</label>
                <input className='input' required id={"name"} placeholder='Введите название компании'
                       type='text' value={name}
                       onChange={(e)=> setName(e.target.value)}/>
                <label hidden={true} htmlFor={'first_name'}>Имя представителя компании</label>
                <input className='input' type={'text'} value={first_name} required id={'first_name'}
                       placeholder={'Введите имя представителя'}
                       onChange={(e)=>setFirst_name(e.target.value)}/>
                <label hidden={true} htmlFor={'last_name'}>Фамилия представителя компании</label>
                <input className='input' type={'text'} value={last_name} required id={'last_name'}
                       placeholder={'Введите фамилию представителя'}
                       onChange={(e)=>setLast_name(e.target.value)}/>
                <label hidden={true} htmlFor={'phone'}>Телефон представителя компании</label>
                <input className='input' value={phone} type={'tel'}  required id={'phone'}
                       placeholder={'Введите номер телефона представителя'}
                       onChange={(e)=>setPhone(e.target.value)}/>
                <label hidden={true} htmlFor={'email'}>Электронная почта представителя компании</label>
                <input className='input' type={'email'} value={email} required id={'email'}
                       placeholder={'Введите электронную почту представителя'}
                       onChange={(e)=>setEmail(e.target.value)}/>
                <label className='pseudo-checkbox__label' htmlFor="active">
                    <input className='checkbox input visually-hidden'  id={"active"}
                           type='checkbox'
                           onChange={()=> setIsActive(true)}/>
                    <span className='pseudo-checkbox'></span>
                    <span className='checkbox__text'>Архивировать</span>
                </label>


                <button className='auth-form__button button' type={"submit"} >{editMode?'Редактировать':'Создать'}</button>
            </form>

        </div>
    );
}

export default CustomerForm;
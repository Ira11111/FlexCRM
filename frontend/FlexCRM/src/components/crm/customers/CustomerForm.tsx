import {useNavigate, useLocation, useParams} from "react-router-dom";
import Loader from "../../Loader/Loader.tsx";
import {FormEvent, useState} from "react";
import api from "../../../api.ts";
import LiveSeach from "../../livesearch/LiveSeach.tsx";
import {ADS_ENDPOINT} from "../../../constants.ts";
import {patch, post, put} from "../../../fetchData.ts";

function CustomerForm() {
    const cId = useParams().customerId;
    const [loading, setLoading] = useState(false);
    const data = useLocation().state;
    const [name, setName] = useState(data?data.customer.name:'');
    const [description, setDescription] = useState(data?data.customer.description:'');
    const [first_name, setFirst_name] = useState(data?data.lead.first_name:'');
    const [last_name, setLast_name] = useState(data?data.lead.last_name:'');
    const [email, setEmail] = useState(data?data.lead.email:'');
    const [phone, setPhone] = useState(data?data.lead.phone:'');
    const [adds, setAdds] = useState(data?data.customer.adds_info.map(cur=>cur.id):[]);
    const addsData = data?data.customer.adds_info:[];
    const [active, setActive] = useState<boolean>(data?data.customer.is_active:true);
    const navigate = useNavigate();


    async function handleSubmitCustomer(e:FormEvent) {
        e.preventDefault();
        try{
            setLoading(true);
            if (!data){
                const res = await api.post(`api/leads/`, {first_name, last_name, phone, email})
                const lead = res.data.id;
                await post(`/api/customers/`, {name, description, lead, is_active:active, adds, contracts:[]})
            }else {
                await put(`api/leads/`,data.lead.id ,{first_name, last_name, phone, email})
                await patch(`/api/customers/`, cId, {name, description, lead: data.lead.id, is_active:active, adds})
            }

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
            <h1 className='title'>{data?'Редактировать':'Создать'} клиента</h1>
            <form className='crm-form' onSubmit={handleSubmitCustomer} method="post">
                <label className={'label'} htmlFor="name">Название
                <input className='input' required id={"name"} placeholder='Введите название компании'
                       type='text' value={name}
                       onChange={(e)=> setName(e.target.value)}/></label>
                <label className={'label'} htmlFor="description">Описание
                    <input className='input' required id={"name"} placeholder='Введите описание компании'
                           type='text' value={description}
                           onChange={(e)=> setDescription(e.target.value)}/></label>
                <label className={'label'} htmlFor={'first_name'}>Имя представителя компании
                <input className='input' type={'text'} value={first_name} required id={'first_name'}
                       placeholder={'Введите имя представителя'}
                       onChange={(e)=>setFirst_name(e.target.value)}/></label>
                <label className={'label'} htmlFor={'last_name'}>Фамилия представителя компании
                <input className='input' type={'text'} value={last_name} required id={'last_name'}
                       placeholder={'Введите фамилию представителя'}
                       onChange={(e)=>setLast_name(e.target.value)}/></label>
                <label className={'label'} htmlFor={'phone'}>Телефон представителя компании
                <input className='input' value={phone} type={'tel'}  required id={'phone'}
                       placeholder={'Введите номер телефона представителя'}
                       onChange={(e)=>setPhone(e.target.value)}/></label>
                <label className={'label'} htmlFor={'email'}>Электронная почта представителя компании
                <input className='input' type={'email'} value={email} required id={'email'}
                       placeholder={'Введите электронную почту представителя'}
                       onChange={(e)=>setEmail(e.target.value)}/></label>

                <label className={'label'}>Рекламный канал
                <LiveSeach endpoint={ADS_ENDPOINT} data={addsData} items={adds} setItems={setAdds} placeholder={"Выберите рекламный канал"}/>
            </label>
                <label className='pseudo-checkbox__label' htmlFor="active">
                    <input className='checkbox input visually-hidden'  id={"active"}
                           type='checkbox' checked={!active}
                           onChange={()=> setActive(!active)}/>
                    <span className='pseudo-checkbox'></span>
                    <span className='checkbox__text'>Архивировать</span>
                </label>


                <button  className='auth-form__button button' type={"submit"} >{data?'Редактировать':'Создать'}</button>
            </form>

        </div>
    );
}

export default CustomerForm;
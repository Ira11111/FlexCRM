import api from "../../../api.ts";
import {useState} from "react";

interface LeadProps {
    first_name:string;
    last_name:string;
    phone:string;
    email:string;
}

function LeadForm({index, lead}:{index?:number, lead?:  LeadProps}) {
    const editMode = lead;
    const [first_name, setFirst_name] = useState(lead?lead.first_name:'');
    const [last_name, setLast_name] = useState(lead?lead.last_name:'');
    const [email, setEmail] = useState(lead?lead.email:'');
    const [phone, setPhone] = useState(lead?lead.phone:'');
    async function handleSubmitLead(e){

        e.preventDefault();
        try {
            if(editMode){
                await api.put(`/api/leads/${index}`, {})
            } else {
                await api.post(`/api/leads/${index}`, {})
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className='crm-form' onSubmit={handleSubmitLead}>
            <h2 className={'subtitle'}>{editMode?'Редактировать':'Информация о представителе компании'}</h2>
            <label hidden={true} htmlFor={'first_name'}>Имя представителя компании</label>
            <input className='input' type={'text'} value={first_name} required id={'first_name'}
                   placeholder={'Введите имя представителя'}
                   onChange={(e)=>setFirst_name(e.target.value)}/>
            <label hidden={true} htmlFor={'last_name'}>Фамилия представителя компании</label>
            <input className='input' type={'text'} value={last_name} required id={'last_name'}
                   placeholder={'Введите фамилию представителя'}
                   onChange={(e)=>setLast_name(e.target.value)}/>
            <label hidden={true} htmlFor={'phone'}>Телефон представителя компании</label>
            <input className='input' type='tel' value={phone} required id={'phone'}
                   placeholder={'Введите номер телефона представителя'}
                   onChange={(e)=>setPhone(e.target.value)}/>
            <label hidden={true} htmlFor={'email'}>Электронная почта представителя компании</label>
            <input className='input' type={'email'} value={email} required id={'email'}
                   placeholder={'Введите электронную почту представителя'}
                   onChange={(e)=>setEmail(e.target.value)}/>
            {/*<button className='auth-form__button button' type={"submit"} >{editMode?'Редактировать':'Создать'}</button>*/}

        </form>
    );
}

export default LeadForm;
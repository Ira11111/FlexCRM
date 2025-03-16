import api from "../../../api.ts";
import {useState} from "react";
import Loader from "../../Loader/Loader.tsx";

interface LeadProps {
    first_name:string;
    last_name:string;
    phone:string;
    email:string;
}

function LeadForm({index, lead, setEditing}:{index:number, lead:  LeadProps, setEditing:()=>void}) {
    const [first_name, setFirst_name] = useState(lead.first_name);
    const [last_name, setLast_name] = useState(lead.last_name);
    const [email, setEmail] = useState(lead.email);
    const [phone, setPhone] = useState(lead.phone);
    const [loading, setLoading] = useState(false);


    async function handleSubmitLead(e){
        e.preventDefault();
        try {
            setLoading(true);
            await api.put(`/api/leads/${index}/`, {first_name, last_name, phone, email})
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false);
        }setEditing(false);
    }

    return (
        <form className='crm-form' onSubmit={handleSubmitLead}>
            {loading && <Loader/>}
            <h2 className={'lead__title'}>{'Редактировать информацию о представителе компании'}</h2>
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
            <button className='lead__edit-button button' type={"submit"} >{'Редактировать'}</button>
        </form>
    );
}

export default LeadForm;
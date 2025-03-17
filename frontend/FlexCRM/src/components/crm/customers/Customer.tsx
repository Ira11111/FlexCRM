import {useLocation, useNavigate, useParams} from "react-router-dom";
import api from "../../../api.ts";
import {useEffect, useState} from "react";
import Lead from "../leads/Lead.tsx";
import LeadForm from "../leads/LeadForm.tsx";
import Loader from "../../Loader/Loader.tsx";
import {ROLE} from "../../../constants.ts";

function Customer() {
    const role_permissions = useLocation().state?useLocation().state.role_permissions:localStorage.getItem(ROLE)=="Operators";
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState({name:'', lead: 0, is_active: false});
    const [isEditing, setEditing] = useState(false);
    const [lead, setLead]=useState({id:'', first_name:'', last_name:'', phone:'', email:''});
    const id = useParams().customerId ||'';
    async function getCustomerById(){
        try{
            setLoading(true);
            const res = await api.get(`/api/customers/${id}/`)
            setCustomer(res.data);
            const leadRes = await api.get(`/api/leads/${res.data.lead}/`)
            setLead(leadRes.data);

        }catch (e) {
            console.error(e);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCustomerById()
    }, [isEditing]);

    return <div className={'wrapper'}>
        {loading && <Loader/>}
        <h1 className='title'>Компания {customer.name}</h1>
        <div className='lead__wrapper'>
            {isEditing?<LeadForm index={customer.lead} setEditing={setEditing} lead={lead}/>:<Lead l={lead}/>}
            {role_permissions && !isEditing && <button className={'button lead__edit-button'} type='button' onClick={()=>setEditing(true)}>Редактировать информацию о представителе</button>}
        </div>
        <button disabled={!role_permissions}  className='button edit__button' onClick={()=>navigate('edit', {state : {customer, lead}})}>Редактировать</button>

    </div>
}

export default Customer;
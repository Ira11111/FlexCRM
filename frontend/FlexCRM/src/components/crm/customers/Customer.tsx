import {useParams} from "react-router-dom";
import api from "../../../api.ts";
import {useEffect, useState} from "react";
import Lead from "../leads/Lead.tsx";
import LeadForm from "../leads/LeadForm.tsx";
import Loader from "../../Loader/Loader.tsx";

function Customer() {
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState({name:'', lead: 0, is_active: false});
    const [isEditing, setEditing] = useState(false);
    const [lead, setLead]=useState({first_name:'', last_name:'', phone:'', email:''});
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
    }, []);

    return <div className={'wrapper'}>
        {loading && <Loader/>}
        <h1 className='title'>Компания {customer.name}</h1>
        <div>
            {isEditing?<LeadForm index={customer.lead} lead={lead}/>:<Lead l={lead}/>}
            <button className={'button'} type='button' onClick={()=>setEditing(true)}>Редактировать</button>
        </div>
    </div>
}

export default Customer;
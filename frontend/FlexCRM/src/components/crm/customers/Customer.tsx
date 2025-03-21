import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Loader from "../../Loader/Loader.tsx";
import {ADS_ENDPOINT, CUSTOMER_ENDPOINT, LEADS_ENDPOINT, ROLE} from "../../../constants.ts";
import {getById} from "../../../fetchData.ts";

function Customer() {
    const role_permissions = localStorage.getItem(ROLE)=="Operators";
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState({name:'', lead: 0});
    const id = useParams().customerId || 0;
    const [lead, setLead] = useState(false);
    const [ads, setAds] = useState([]);

    async function getCustomerById(){
        try{
            setLoading(true);
            const res = await getById(CUSTOMER_ENDPOINT, id)
            setCustomer(res);
            const resAds = await Promise.all(res.adds.map((id:number)=>
                getById(ADS_ENDPOINT, id)
            ))
            setAds(resAds);
            const resLead = await getById(LEADS_ENDPOINT, res.lead);
            setLead(resLead)
             }catch (e) {
            if (e.status == 404){
                navigate('*')
            }
            console.error(e);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCustomerById()
    }, [id]);



    return <div className={'wrapper'}>
        {loading && <Loader/>}
        <h1 className='title'>Компания {customer.name}</h1>
        <div className='lead__wrapper'>
            <div className={'lead'}>
                <h2 className='lead__title'>Представитель</h2>
                <p className={'lead__name'}>{lead.first_name} {lead.last_name}</p>
                <span>
            <h2 className='subtitle'>Телефон</h2>
            <p>{lead.phone}</p>
        </span>
                <span>
            <h2 className='subtitle'>Электронная почта</h2>
            <p>{lead.email}</p>
        </span>

            </div>
        </div>
        <button disabled={!role_permissions}  className='button edit__button' onClick={()=>navigate('edit', {state : {customer, lead, ads}})}>Редактировать</button>

    </div>
}

export default Customer;
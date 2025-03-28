import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Loader from "../../Loader/Loader.tsx";
import {CUSTOMER_ENDPOINT, ROLE} from "../../../constants.ts";
import {customerProps, getById, leadProps} from "../../../fetchData.ts";


function Customer() {
    const role_permissions = localStorage.getItem(ROLE)=="Operators";
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState({name:'', description:'', adds_info:[]});
    const id = useParams().customerId || 0;
    const [lead, setLead] = useState<leadProps>({id:0, first_name:'', last_name:'', email:'', phone:''});
    const [ads, setAds] = useState([]);

    async function getCustomerById(){
        try{
            setLoading(true);
            const res:customerProps|undefined = await getById<customerProps>(CUSTOMER_ENDPOINT, id)
            if(res){
                setCustomer(res);
                setAds(res.adds_info);
                setLead(res.lead_info)
            }

        }catch (e) {

            console.error(e);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCustomerById()
    }, [id]);



    return <main className={'wrapper'}>
        {loading && <Loader/>}
        <h1 className='title'>Компания {customer.name}</h1>
        <p className={'item__descr'}>{customer.description}</p>
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

    </main>
}

export default Customer;
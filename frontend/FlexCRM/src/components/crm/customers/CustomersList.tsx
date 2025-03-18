import {useEffect, useState} from "react";
import CustomerCard from "./CustomerCard.tsx";
import Loader from "../../Loader/Loader.tsx";
import {useNavigate} from "react-router-dom";
import {getAll} from '../../../fetchData.ts';
import {CUSTOMER_ENDPOINT, ROLE} from "../../../constants.ts";
import Pagination from "../Pagination/Pagination.tsx";

function CustomersList (){
    const role_permissions:boolean = localStorage.getItem(ROLE)=="Operators";
    const navigate = useNavigate()
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [endpoint, setEndpoint] = useState(CUSTOMER_ENDPOINT)
    useEffect(()=>{
        setLoading(true)
        const getAllCustomers = async ()=>{
            try {
                setLoading(true);
                const res = await getAll(endpoint);
                setCustomers(res.results);
                setCount(res.count)
            }catch (e){
                console.error(e);
            }
            finally {
                setLoading(false);
            }

        }
        getAllCustomers()
    }, [endpoint])

    return <div className='wrapper'>
        {loading && <Loader />}
        <div className='title__wrapper'>
            <h1 className='title'>Компании-клиенты</h1>
            <button disabled={!role_permissions} className='button add-button' onClick={()=>navigate('create')}>Добавить</button>
        </div>
        <div className='cards-container'>
            {customers.map((cur, index) => {return <CustomerCard customer={cur} key={index}/>})}
        </div>
        <Pagination endpoint={CUSTOMER_ENDPOINT} count={count} setEndpoint={setEndpoint}/>
    </div>

}
export default CustomersList;
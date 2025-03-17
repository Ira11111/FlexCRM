import {useEffect, useState} from "react";
import CustomerCard from "./CustomerCard.tsx";
import Loader from "../../Loader/Loader.tsx";
import {useNavigate} from "react-router-dom";
import getAll from '../../../fetchData.ts';
import {ROLE} from "../../../constants.ts";
import {usePagination} from "../../../context/PaginationContext.tsx";
import Pagination from "../Pagination/Pagination.tsx";

function CustomersList (){
    const role_permissions = localStorage.getItem(ROLE)=="Operators";
    const navigate = useNavigate()
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {endpoint, setEndpoint, previous, updatePagination, next} = usePagination()

    useEffect(()=>{
        setLoading(true)
        const getAllCustomers = async ()=>{
            const res = await getAll(endpoint);
            setCustomers(res.results);
            setLoading(false);
            updatePagination(res);
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
            {customers.map((cur, index) => {return <CustomerCard role_permissions={role_permissions}  customer={cur} key={index} index={index}/>})}
        </div>
        <Pagination previous={previous} next={next} setEndpoint={setEndpoint}/>
    </div>

}
export default CustomersList;
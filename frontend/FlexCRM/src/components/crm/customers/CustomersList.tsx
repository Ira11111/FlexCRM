import api from  '../../../api'
import {useEffect, useState} from "react";
import CustomerCard from "./CustomerCard.tsx";
import Loader from "../../Loader/Loader.tsx";
import {useNavigate} from "react-router-dom";

function CustomersList (){
    const navigate = useNavigate()
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    async function getAllCustomers (){
        try{
            setLoading(true);
            const res = await api.get('/api/customers/');
            setCustomers(res.data);
        }catch (e) {
            console.log(e);
        }finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        getAllCustomers();
    }, [])

    return <div className='wrapper'>
        {loading && <Loader />}
        <div className='title__wrapper'>
            <h1 className='title'>Компании-клиенты</h1>
            <button className='button add-button' onClick={()=>navigate('create')}>Добавить</button>
        </div>
        <div className='cards-container'>
            {customers.map((cur, index) => {return <CustomerCard customer={cur} key={index} index={index}/>})}
        </div>
        <div className='pagination__buttons'>
            <button className='button'>Назад</button>
            <button className='button'>Вперед</button>
        </div>
    </div>

}
export default CustomersList;
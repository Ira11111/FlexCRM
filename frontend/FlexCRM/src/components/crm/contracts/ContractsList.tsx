import Loader from '../../Loader/Loader.tsx'
import {customerProps, getAll} from '../../../fetchData.ts'
import {useEffect, useState} from "react";
import Pagination from "../Pagination/Pagination.tsx";
import {CONTRACT_ENDPOINT, CUSTOMER_ENDPOINT, ROLE} from '../../../constants.ts';
import {useLocation, useNavigate} from "react-router-dom";
import ContractCard from "./ContractCard.tsx";
import Search from "../search/Search.tsx";



function ContractsList() {
    const location = useLocation();
    const navigate = useNavigate();

    const role_permissions = localStorage.getItem(ROLE)=="Managers";
    const customer:customerProps = location.state?location.state.customer:null;
    const [loading, setLoading] = useState<boolean>(false);
    const [contracts, setContracts] = useState([]);
    const [count, setCount] = useState(0);
    const [endpoint, setEndpoint] = useState(customer?`${CUSTOMER_ENDPOINT}${customer.id}/contracts/`:`${CONTRACT_ENDPOINT}`);
    const [curPage, setCurPage] = useState(1);


    useEffect(() => {
        if (!customer){
            setEndpoint(CONTRACT_ENDPOINT)
        }
    }, [customer]);

    const getAllContracts = async () => {
        try{
            setLoading(true);
            const res = await getAll(endpoint);
            if (res){
                setContracts(res.results);
                setCount(res.count)
            }

        }catch (e){
            console.log(e)
        }finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        getAllContracts();
    }, [endpoint]);

    return <main className={'wrapper'}>
        {loading && <Loader/>}
        <div className='title__wrapper'>
            <h1 className='title'>Контракты {customer?customer.name:''}</h1>
            {!customer && <button disabled={!role_permissions} className='button add-button' onClick={()=>navigate('create')}>Добавить</button>}
        </div>
        <Search setCurPage={setCurPage} curPage={curPage} endpoint={customer?`${CUSTOMER_ENDPOINT}${customer.id}/contracts/`:`${CONTRACT_ENDPOINT}`}
                setEndpoint={setEndpoint}
                params={[{key:'name', value:'По имени ▲'}, {key:'-name', value:'По имени ▼'},
                    {key:'start_date', value:'По дате начала ▲'}, {key:'-start_date', value:'По дате начала ▼'}]}/>
        <div className='cards-container'>
            {contracts.map((cur, index) => {return <ContractCard contract={cur} key={index}/>})}
            {contracts.length == 0 && <p>Ничего не найдено</p>}
        </div>
        <Pagination count={count} curPage={curPage} setCurPage={setCurPage}/>
    </main>
}

export default ContractsList;
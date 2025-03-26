import Loader from '../../Loader/Loader.tsx'
import {getAll} from '../../../fetchData.ts'
import {useEffect, useState} from "react";
import Pagination from "../Pagination/Pagination.tsx";
import {CONTRACT_ENDPOINT, ROLE} from '../../../constants.ts';
import {useNavigate} from "react-router-dom";
import ContractCard from "./ContractCard.tsx";
import Search from "../search/Search.tsx";



function ContractsList() {

    const role_permissions = localStorage.getItem(ROLE)=="Managers";
    const [loading, setLoading] = useState<boolean>(false);
    const [contracts, setContracts] = useState([]);
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [endpoint, setEndpoint] = useState(CONTRACT_ENDPOINT);
    const [curPage, setCurPage] = useState(1);

    const getAllContracts = async () => {
        try{
            setLoading(true);
            const res = await getAll(endpoint);
            if (res){
                setContracts(res.results);
                setCount(res.count)
            }
            console.log(res)

        }catch (e){
            console.log(e)
        }finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getAllContracts();
    }, [endpoint]);


    return <div className={'wrapper'}>
        {loading && <Loader/>}
        <div className='title__wrapper'>
            <h1 className='title'>Контракты</h1>
            <button disabled={!role_permissions} className='button add-button' onClick={()=>navigate('create')}>Добавить</button>
        </div>
        <Search setCurPage={setCurPage} curPage={curPage} endpoint={CONTRACT_ENDPOINT}
                setEndpoint={setEndpoint}
                params={[{key:'name', value:'По имени ▲'}, {key:'-name', value:'По имени ▼'},
                    {key:'start_date', value:'По дате начала ▲'}, {key:'-start_date', value:'По дате начала ▼'}]}/>
        <div className='cards-container'>
            {contracts.map((cur, index) => {return <ContractCard contract={cur} key={index}/>})}
            {contracts.length == 0 && <p>Ничего не найдено</p>}
        </div>
        <Pagination count={count} curPage={curPage} setCurPage={setCurPage}/>
    </div>
}

export default ContractsList;
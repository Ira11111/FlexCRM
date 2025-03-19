import Loader from '../../Loader/Loader.tsx'
import {getAll} from '../../../fetchData.ts'
import {useEffect, useState} from "react";
import Pagination from "../Pagination/Pagination.tsx";
import {CONTRACT_ENDPOINT, ROLE} from '../../../constants.ts';
import {useNavigate} from "react-router-dom";
import ContractCard from "./ContractCard.tsx";


function ContractsList() {

    const role_permissions = localStorage.getItem(ROLE)=="Managers";
    const [loading, setLoading] = useState<boolean>(false);
    const [contracts, setContracts] = useState([]);
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [endpoint, setEndpoint] = useState(CONTRACT_ENDPOINT);

    const getAllContracts = async () => {
        try{
            setLoading(true);
            const res = await getAll(endpoint);
            setContracts(res.results);
            setCount(res.count)
        }catch (e){
            setLoading(false);
        }finally {
            setLoading(false);
        }
    }
    console.log(endpoint)

    useEffect(() => {
        getAllContracts();
    }, [endpoint]);


    return <div className={'wrapper'}>
        {loading && <Loader/>}
        <div className='title__wrapper'>
            <h1 className='title'>Контракты</h1>
            <button disabled={!role_permissions} className='button add-button' onClick={()=>navigate('create')}>Добавить</button>
        </div>
        <div className='cards-container'>
            {contracts.map((cur, index) => {return <ContractCard contract={cur} key={index}/>})}
        </div>
        <Pagination endpoint={endpoint} count={count} setEndpoint={setEndpoint}/>
    </div>
}

export default ContractsList;
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Loader from "../../Loader/Loader.tsx";
import AdCard from './AdCard.tsx'
import {ROLE, ADS_ENDPOINT} from "../../../constants.ts";
import {getAll} from "../../../fetchData.ts";
import Pagination from "../Pagination/Pagination.tsx";
import Search from "../search/Search.tsx";


function AdsList () {
    const role_permissions:boolean = localStorage.getItem(ROLE)=='Marketers';
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [ads, setAds] = useState([]);
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [endpoint, setEndpoint] = useState(ADS_ENDPOINT);
    const [curPage, setCurPage] = useState(1);


    async function getAllAds() {
        try {
            setLoading(true)
            const res = await getAll(endpoint);
            setAds(res.results)
            setCount(res.count);
        } catch (e: any) {
            console.log(e);
            setError(e)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllAds()
    }, [endpoint]);

    return <div className='wrapper'>
        {error && <p>{error}</p>}
        {loading && <Loader />}
        <div className='title__wrapper'>
            <h1 className='title'>Рекламные кампании</h1>
            <button disabled={!role_permissions} className='button add-button' onClick={()=>navigate('create')}>Добавить</button>
        </div>
        <Search setCurPage={setCurPage} curPage={curPage} endpoint={ADS_ENDPOINT}
                setEndpoint={setEndpoint}
                params={[{key:'name', value:'По имени ▲'}, {key:'-name', value:'По имени ▼'},
                        {key:'profit', value:'По прибыли ▲'}, {key:'-profit', value:'По прибыли ▼'}]}/>
        <div className='cards-container'>
            {ads.map((cur :{id:number, name:'', budget:'', customers_count:'', profit: '', product:[]}, index : number) =>
                <AdCard key={index} ad={cur} />)}
            {ads.length == 0 && <p>Ничего не найдено</p>}
        </div>
        <Pagination count={count} curPage={curPage} setCurPage={setCurPage}/>
    </div>
}

export default AdsList;
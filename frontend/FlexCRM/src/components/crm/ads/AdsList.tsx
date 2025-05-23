import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Loader from "../../Loader/Loader.tsx";
import AdCard from './AdCard.tsx'
import {ROLE, ADS_ENDPOINT, PRODUCT_ENDPOINT} from "../../../constants.ts";
import {getAll} from "../../../fetchData.ts";
import Pagination from "../Pagination/Pagination.tsx";
import Search from "../search/Search.tsx";


function AdsList () {
    const location = useLocation();
    const product = location.state?location.state.product:null;
    const role_permissions:boolean = localStorage.getItem(ROLE)=='Marketers';
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [ads, setAds] = useState([]);
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [endpoint, setEndpoint] = useState(product?`${PRODUCT_ENDPOINT}${product.id}/adds/`
        :`${ADS_ENDPOINT}`);
    const [curPage, setCurPage] = useState(1);

    useEffect(() => {
        if (!product){
            setEndpoint(ADS_ENDPOINT)
        }
    }, [product]);
    async function getAllAds() {
        try {
            setLoading(true)
            const res:{ results: []; count: number } | undefined = await getAll(endpoint);
            if (res) {
                setAds(res.results);
                setCount(res.count);
            }
        } catch (e: any) {
            console.log(e);
            setError(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllAds()
    }, [endpoint]);

    return <main className='wrapper'>
        {error && <p>{error}</p>}
        {loading && <Loader />}
        <div className='title__wrapper'>
            <h1 className='title'>Рекламные кампании {product?product.name:''}</h1>
            {!product && <button disabled={!role_permissions} className='button add-button' onClick={()=>navigate('create')}>Добавить</button>}
        </div>
        <Search setCurPage={setCurPage} curPage={curPage} endpoint={product?`${PRODUCT_ENDPOINT}${product.id}/adds/`
            :`${ADS_ENDPOINT}`}
                setEndpoint={setEndpoint}
                params={[{key:'name', value:'По имени ▲'}, {key:'-name', value:'По имени ▼'},
                        {key:'profit', value:'По прибыли ▲'}, {key:'-profit', value:'По прибыли ▼'}]}/>
        <div className='cards-container'>
            {ads.map((cur :{id:number, name:'', budget:'', customers_count:'', profit: '', product:[]}, index : number) =>
                <AdCard key={index} ad={cur} />)}
            {ads.length == 0 && <p>Ничего не найдено</p>}
        </div>
        <Pagination count={count} curPage={curPage} setCurPage={setCurPage}/>
    </main>
}

export default AdsList;
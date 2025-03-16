import {useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import Loader from "../../Loader/Loader.tsx";
import AdCard from './AdCard.tsx'
import {ROLE} from "../../../constants.ts";
import getAll from "../../../fetchData.ts";
import Pagination from "../Pagination/Pagination.tsx";
import {usePagination} from "../../../context/PaginationContext.tsx";

function AdsList () {
    const role_permissions:boolean = localStorage.getItem(ROLE)=='Marketers';
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [ads, setAds] = useState([]);
    const navigate = useNavigate();
    const {endpoint, setEndpoint, previous, next, updatePagination} = usePagination();
    async function getAllAds() {
        try {
            setLoading(true)
            const res = await getAll(endpoint);
            setAds(res.results)
            updatePagination(res)
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
        <div className='cards-container'>
            {ads.map((cur :{name:'', budget:'', customers_count:'', profit: '', product:number}, index : number) =>
                <AdCard role_permissions={role_permissions} key={index} ad={cur} index={index+1} />)}
        </div>
        <Pagination previous={previous} next={next} setEndpoint={setEndpoint}/>
    </div>
}

export default AdsList;
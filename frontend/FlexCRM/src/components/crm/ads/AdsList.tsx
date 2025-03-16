import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../../../api.ts";
import Loader from "../../Loader/Loader.tsx";
import AdCard from './AdCard.tsx'
import {ROLE} from "../../../constants.ts";

function AdsList () {
    const role_permissions:boolean = localStorage.getItem(ROLE)=='Marketers';
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [ads, setAds] = useState([]);
    const navigate = useNavigate();
    async function getAllAds() {
        try {
            setLoading(true)
            const res = await api.get('/api/adds/')
            setAds(res.data.results)
        } catch (e: any) {
            console.log(e);
            setError(e)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllAds()
    }, []);

    return <div className='wrapper'>
        {error && <p>{error}</p>}
        {loading && <Loader />}
        <div className='title__wrapper'>
            <h1 className='title'>Рекламные кампании</h1>
            <button disabled={!role_permissions} className='button add-button' onClick={()=>navigate('create')}>Добавить</button>
        </div>
        <div className='cards-container'>
            {ads.map((cur :{name:'', budget:'', leads_count: '', customers_count:'', profit: '', product:number}  , index : number) => {
                return <AdCard role_permissions={role_permissions} key={index} ad={cur} index={index+1} />})}
        </div>
        <div className='pagination__buttons'>
            <button className='button'>Назад</button>
            <button className='button'>Вперед</button>
        </div>
    </div>
}

export default AdsList;
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import api from '../../../api'
import {useEffect, useState} from "react";
import Loader from "../../Loader/Loader.tsx";
import {ROLE} from "../../../constants.ts";




function Ad() {
    const id = useParams().adId || '';
    const role_permissions = useLocation().state.role_permissions || localStorage.getItem(ROLE);
    const navigate = useNavigate();
    const [ad, setAd] = useState({name:'', budget:'',leads_count:'', customers_count:'',profit:'', product:0});
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);


    async function getAd(){
        try{
            setLoading(true);
            const res = await api.get(`/api/adds/${id}/`)
            setAd(res.data);
            const productsResponse = await Promise.all(res.data.product.map((item:number)=>
               api.get(`/api/products/${item}/`)))
            const productsData = productsResponse.map((response) => response.data)
            console.log(productsData);
            setProduct(productsData);
        }catch (e) {
            console.error(e);
        }
        finally {

            setLoading(false);
        }
    }



    useEffect(() => {
        getAd();
    }, []);

    return <div className='wrapper'>
        {loading && <Loader/>}
        <h1 className='title'>Реклама {ad.name}</h1>

        <span>
            <h2 className='subtitle'>Бюджет</h2>
            <p>{ad.budget}</p>
        </span>
        <span>
            <h2 className='subtitle'>Количество новых покупателей</h2>
            <p>{ad.customers_count}</p>
        </span>

        <span>
            <h2 className='subtitle'>Прибыль</h2>
            <p>{ad.profit}</p>
        </span>

        <span>
            <h2 className='subtitle'>Рекламируемые услуги</h2>
            {
                product.map((cur, ind)=>{
                    return  <p key={ind}><Link className='link' to={`/crm/products/${cur.id}`}>{cur.name}</Link></p>

                })
            }
        </span>
        <button disabled={!role_permissions} className='button edit__button' onClick={()=>navigate('edit', {state : {ad, product}})}>Редактировать</button>


    </div>
}

export default Ad;
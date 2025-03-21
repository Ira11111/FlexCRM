import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Loader from "../../Loader/Loader.tsx";
import {PRODUCT_ENDPOINT, ROLE} from "../../../constants.ts";
import { getById } from "../../../fetchData.ts";


function Ad() {
    const id:string = useParams().adId || '';
    const role_permissions = localStorage.getItem(ROLE) =="Marketers";
    const navigate = useNavigate();
    const [ad, setAd] = useState({name:'', budget:'',leads_count:'', customers_count:'',profit:'', product:0});
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getAd(){
        try{
            setLoading(true);
            const res = await getById('/api/adds/', id)
            setAd(res);
            const productsRes = await Promise.all(res.product.map((item:number)=>
               getById(PRODUCT_ENDPOINT, item)))
            setProduct(productsRes);
        }catch (e) {
            if (e.status == 404){
                navigate('*')
            }
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
import {Link, useParams} from "react-router-dom";
import api from '../../../api'
import {useEffect, useState} from "react";




function Ad() {
    const id = useParams().adId || '';

    const [ad, setAd] = useState({name:'', budget:'',leads_count:'', customers_count:'',profit:'', product:0});
    const [product, setProduct] = useState({name:''});


    async function getAd(){
        try{
            const res = await api.get(`/api/adds/${id}/`)
            setAd(res.data);
            const resProduct = await api.get(`/api/products/${res.data.product}/`)
            setProduct(resProduct.data);
        }catch (e) {
            console.error(e);
        }
        finally {

        }
    }



    useEffect(() => {
        getAd();
    }, []);

    return <div className='wrapper'>
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
            <h2 className='subtitle'>Рекламируемая услуга</h2>
            <p><Link className='link' to={`/crm/products/${ad.product}`}>{product.name}</Link></p>
        </span>


    </div>
}

export default Ad;
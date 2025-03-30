import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Loader from "../../Loader/Loader.tsx";
import {ADS_ENDPOINT, ROLE} from "../../../constants.ts";
import {getById, adProps, productProps} from "../../../fetchData.ts";



function Ad() {
    const id:string = useParams().adId || '';
    const role_permissions = localStorage.getItem(ROLE) =="Marketers";
    const navigate = useNavigate();
    const [ad, setAd] = useState<adProps>({id:0, name:'', budget:0,customers_count:0,profit:0, products_info:[]});
    const [product, setProduct] = useState<productProps[]>([{name:'', id:0, description:'', cost:0, is_active:true}]);
    const [loading, setLoading] = useState(false);

    async function getAd(){
        try{
            setLoading(true);
            const res:adProps|undefined  = await getById<adProps>(ADS_ENDPOINT, id)
            if (res){
                console.log(res)
                setAd(res);
                setProduct(res.products_info)
            }

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

    return <main className='wrapper'>
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
                product.map((cur:{id:number, name:string}, ind)=>{
                    return  <p key={ind}><Link className='link' to={`/crm/products/${cur.id}`}>{cur.name}</Link></p>

                })
            }
        </span>
        <button disabled={!role_permissions} className='button edit__button' onClick={()=>navigate('edit', {state : {ad, product}})}>Редактировать</button>


    </main>
}

export default Ad;
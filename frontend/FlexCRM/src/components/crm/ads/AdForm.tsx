import {useLocation, useNavigate, useParams} from "react-router-dom";
import {FormEvent, useState} from "react";
import Loader from "../../Loader/Loader.tsx";
import LiveSeach from "../../livesearch/LiveSeach.tsx";
import {post, put} from "../../../fetchData.ts";
import {PRODUCT_ENDPOINT} from "../../../constants.ts";




function AdForm() {
    const navigate = useNavigate();
    const params = useParams();
    const editMode : boolean = params.adId != undefined
    const data = useLocation().state || null
    const [name, setName] = useState(data?data.ad.name:'');
    const [budget, setBudget] = useState(data?data.ad.budget:'');
    const [product, setProduct] = useState(data?data.product:[]);
    const [customers_count, setCustomers_count] = useState(data?data.ad.customers_count:'');
    const [profit, setProfit] = useState(data?data.ad.profit:'');
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState(data?data.ad.product:[]);

    async function handleSubmitAd(e:FormEvent) {
        e.preventDefault();
        try{
            setLoading(true);
            if (editMode && params.adId) {
                await put(`/api/adds/`, params.adId, {name, budget, customers_count, profit, product: items})
            } else {
                await post(`/api/adds/`, {name, budget, customers_count, profit, product: items})
            }
        }catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false);
            navigate(-1)
        }

    }



    return (
        <div className='wrapper'>
            {loading && <Loader/>}
            <h1 className='title'>{editMode?'Редактировать':'Создать'} рекламную кампанию</h1>
            <form className='crm-form' onSubmit={handleSubmitAd} method="post">
                <label className={'label'} htmlFor="name">Название
                <input className='input' required id={"name"} placeholder='Введите название'
                       type='text' value={name} onChange={(e)=> setName(e.target.value)}/>
                </label>

                <label className={'label'} htmlFor="budget">Бюджет
                <input className='input' type={'number'} id={"budget"} placeholder='Введите бюджет'
                          value={budget}
                          onChange={(e)=> setBudget(e.target.value)}/>
            </label>

                <label className={'label'} htmlFor="customers_count">Количество покупателей
                    <input className='input' required id={"customers_count"} placeholder='Введите количество новых клиентов'
                           type='number' value={customers_count}
                           onChange={(e)=> setCustomers_count(e.target.value)}/>
                </label>
                <label className={'label'} htmlFor="profit">Прибыль
                <input className='input' required id={"profit"} placeholder='Введите прибыль'
                       type='number' value={profit}
                       onChange={(e)=> setProfit(e.target.value)}/>
                </label>
                <label className={'label'}>Рекламируемые услуги
                <LiveSeach placeholder={"Выберите рекламируемые услуги"} data={product} endpoint={PRODUCT_ENDPOINT} items={items} setItems={setItems} />
                </label>
                <button disabled={items.length==0} className='auth-form__button button' type={"submit"} >{editMode?'Редактировать':'Создать'}</button>
            </form>
        </div>
    );
}

export default AdForm;
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../../api.ts";
import Loader from "../../Loader/Loader.tsx";
import {getAllProducts} from "../../../fetchData.ts";

function AdForm() {
    const navigate = useNavigate();
    const params = useParams();
    const editMode : boolean = params.productId != undefined
    const data = useLocation().state || null
    const [name, setName] = useState(data?data.product.name:'');
    const [budget, setBudget] = useState(data?data.product.budget:'');
    const [leads_count, setLeads_count] = useState(data?data.product.leads_count:'');
    const [customers_count, setCustomers_count] = useState(data?data.product.customers_count:'');
    const [profit, setProfit] = useState(data?data.product.Profit:'');
    const [product, setProduct] = useState(data?data.product.Profduct:'');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () =>{
            try{
                const res = await getAllProducts()
                setProducts(res)
            }catch (e){
                console.log(e);
            }
        }
        fetchProducts();
    }, []);

    async function handleSubmit() {
        console.log(product)
        try{
            setLoading(true);
            if (editMode) {
                await api.put(`/api/adds/${params.productId}/`, {name, budget, leads_count, customers_count, profit, product})
            } else {
                await api.post(`/api/adds/`, {name, budget, leads_count, customers_count, profit, product})
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
            <form className='crm-form' onSubmit={handleSubmit} method="post">
                <label hidden={true} htmlFor="name">Название</label>
                <input className='input' required id={"name"} placeholder='Введите название'
                       type='text' value={name}
                       onChange={(e)=> setName(e.target.value)}/>

                <label hidden={true} htmlFor="budget">Бюджет</label>
                <input className='input' type={'number'} id={"budget"} placeholder='Введите бюджет'
                          value={budget}
                          onChange={(e)=> setBudget(e.target.value)}/>

                <label hidden={true} htmlFor="leads_count">Количество представителей компаний</label>
                <input className='input' required id={"leads_count"} placeholder='Введите количество представителей компаний'
                       type='number' value={leads_count}
                       onChange={(e)=> setLeads_count(e.target.value)}/>

                <label hidden={true} htmlFor="customers_count">Количество покупателей</label>
                <input className='input' required id={"customers_count"} placeholder='Введите количество новых клиентов'
                       type='number' value={customers_count}
                       onChange={(e)=> setCustomers_count(e.target.value)}/>

                <label hidden={true} htmlFor="profit">Прибыль</label>
                <input className='input' required id={"profit"} placeholder='Введите прибыль'
                       type='number' value={profit}
                       onChange={(e)=> setProfit(e.target.value)}/>

                <select value={product} onChange={(e)=>{setProduct(e.target.value)}}>
                    {products.map(({cur, index}:{cur:{name:string}, index: number})=>{
                        return <option key={index} value={index+1}>
                            {cur.name}
                        </option>
                    })}
                </select>

                <button className='auth-form__button button' type={"submit"} >{editMode?'Редактировать':'Создать'}</button>
            </form>
        </div>
    );
}

export default AdForm;
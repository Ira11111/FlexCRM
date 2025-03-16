import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import api from "../../../api.ts";
import Loader from "../../Loader/Loader.tsx";
import getAll from '../../../fetchData.ts';

interface productInterface {
    id: number;
    name: string;
    description: string;
    cost: number;
    is_active: boolean;
}

function AdForm() {
    const navigate = useNavigate();
    const params = useParams();
    const editMode : boolean = params.adId != undefined
    const data = useLocation().state || null
    const [name, setName] = useState(data?data.ad.name:'');
    const [budget, setBudget] = useState(data?data.ad.budget:'');
    const [customers_count, setCustomers_count] = useState(data?data.ad.customers_count:'');
    const [profit, setProfit] = useState(data?data.ad.profit:'');
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState('');
    const [product, setProduct] = useState(data?data.ad.product:[]);
    const [checkedProducts, setCheckedProducts] = useState(data?data.product:[]);
    const [result, setResult] = useState([]);
    const [tId, setTId] = useState(0);
    const [focus, setFocus] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchProductsByQuery = async () =>{
            try{
                const res = await getAll(`/api/products/?search=${search}`)
                res?setResult(res.results):setResult([])
            }catch (e){
                console.log(e);
            }
        }
        clearTimeout(tId)
        setTId(setTimeout(()=>fetchProductsByQuery(), 1000));
    }, [search]);



    async function handleSubmitAd(e) {
        e.preventDefault();
        console.log(name, budget, customers_count, profit, product)
        try{
            setLoading(true);
            if (editMode) {
                await api.put(`/api/adds/${params.adId}/`, {name, budget, customers_count, profit, product})
            } else {
                await api.post(`/api/adds/`, {name, budget, customers_count, profit, product})
            }
        }catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false);
            navigate(-1)
        }

    }



    const addProduct = (curProduct : {name:string, id:number})=>{
        if (product.indexOf(curProduct.id)==-1){
            setProduct([...product, curProduct.id]);
            setCheckedProducts([...checkedProducts, curProduct]);
            setFocus(false)
        }
     }

    const uncheckedProduct = (curProduct:productInterface)=>{
        setCheckedProducts(checkedProducts.filter((product:productInterface) => product.id !== curProduct.id))
        setProduct(product.filter((id:number) => id !== curProduct.id))
    }

    const handleClickOutside = (event:any) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setFocus(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);


    return (
        <div className='wrapper'>
            {loading && <Loader/>}
            <h1 className='title'>{editMode?'Редактировать':'Создать'} рекламную кампанию</h1>
            <form className='crm-form' onSubmit={handleSubmitAd} method="post">
                <label hidden={true} htmlFor="name">Название</label>
                <input className='input' required id={"name"} placeholder='Введите название'
                       type='text' value={name}
                       onChange={(e)=> setName(e.target.value)}/>

                <label hidden={true} htmlFor="budget">Бюджет</label>
                <input className='input' type={'number'} id={"budget"} placeholder='Введите бюджет'
                          value={budget}
                          onChange={(e)=> setBudget(e.target.value)}/>


                <label hidden={true} htmlFor="customers_count">Количество покупателей</label>
                <input className='input' required id={"customers_count"} placeholder='Введите количество новых клиентов'
                       type='number' value={customers_count}
                       onChange={(e)=> setCustomers_count(e.target.value)}/>

                <label hidden={true} htmlFor="profit">Прибыль</label>
                <input className='input' required id={"profit"} placeholder='Введите прибыль'
                       type='number' value={profit}
                       onChange={(e)=> setProfit(e.target.value)}/>


                <div className={'products'}>
                    <ul className={'products__list-checked'}>
                        {checkedProducts.map((cur:productInterface, index:number)=>{
                            return (<li tabIndex={0} className={'products__list-checked-item'} onClick={()=>{uncheckedProduct(cur)}}  key={index}>
                                <span className={'smert'}>
                                    {cur.name}
                                </span>
                            </li>)
                        })}
                    </ul>
                    <div className={'input-cont'}>
                        <input className={`input input__products ${focus}`} ref={containerRef} onFocus={()=> setFocus(true)} value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                        {focus && <ul className={'products__list'}>
                            {result.map((cur:productInterface)=>{
                                return (<li onKeyDown={(e)=>{if(e.key=='Enter')addProduct(cur)}} tabIndex={0} className={'products__list-item'} onClick={()=>addProduct(cur)} key={cur.id}>{cur.name}</li>)
                            })}
                        </ul>}
                    </div>


                </div>


                <button disabled={checkedProducts.length==0} className='auth-form__button button' type={"submit"} >{editMode?'Редактировать':'Создать'}</button>
            </form>
        </div>
    );
}

export default AdForm;
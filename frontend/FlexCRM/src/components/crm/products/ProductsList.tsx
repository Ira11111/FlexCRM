import Loader from "../../Loader/Loader.tsx";
import {useEffect, useState} from "react";
import ProductCard from "./ProductCard.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {customerProps, getAll} from "../../../fetchData.ts";
import {CUSTOMER_ENDPOINT, PRODUCT_ENDPOINT, ROLE} from "../../../constants.ts";
import Pagination from "../Pagination/Pagination.tsx";
import Search from "../search/Search.tsx";

function ProductsList () {
    const location = useLocation();
    const customer:customerProps = location.state?location.state.customer:null;
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const role_permissions:boolean = localStorage.getItem(ROLE)=='Marketers';
    const [endpoint, setEndpoint] = useState(customer?`${CUSTOMER_ENDPOINT}${customer.id}/products/`
        :`${PRODUCT_ENDPOINT}`);
    const [curPage, setCurPage] = useState(1);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!customer){
            setEndpoint(PRODUCT_ENDPOINT)
        }
    }, [customer]);

    useEffect(() => {
        setLoading(true)
        const getAllProducts = async ()=>{
            try{
                const res = await getAll(endpoint);
                if (res){
                    setProducts(res.results);
                    setCount(res.count)
                }
                console.log(res)

            }catch (e){
                console.error(e);
            }finally {
                setLoading(false);
            }

        }
        getAllProducts()
    }, [endpoint]);

    return <main className='wrapper'>
        {loading && <Loader />}
        <div className='title__wrapper'>
            <h1 className='title'>Услуги {customer?`, приобретенные ${customer.name}`:''}</h1>
            {!customer && <button disabled={!role_permissions} className='button add-button' onClick={()=>navigate('create')}>Добавить</button>}
        </div>
        <Search curPage={curPage} setCurPage={setCurPage} endpoint={customer?`${CUSTOMER_ENDPOINT}${customer.id}/products/`
            :`${PRODUCT_ENDPOINT}`} setEndpoint={setEndpoint}
                params={[{key:'name', value:'По имени ▲'}, {key:'-name', value:'По имени ▼'},
                    {key:'cost', value:'По цене ▲'}, {key:'-cost', value:'По цене ▼'}]}/>
        <div className='cards-container'>
            {products.map((cur :{id:number, name:'', description:'', cost: '', is_active:false}  , index : number) => {
                return <ProductCard key={index} product={cur} />})}
            {products.length == 0 && <p>Ничего не найдено</p>}
        </div>
        <Pagination count={count} curPage={curPage} setCurPage={setCurPage}/>
    </main>
}
export default ProductsList;
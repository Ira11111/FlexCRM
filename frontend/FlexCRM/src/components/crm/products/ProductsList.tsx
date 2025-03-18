import Loader from "../../Loader/Loader.tsx";
import {useEffect, useState} from "react";
import ProductCard from "./ProductCard.tsx";
import {useNavigate} from "react-router-dom";
import {getAll} from "../../../fetchData.ts";
import {PRODUCT_ENDPOINT, ROLE} from "../../../constants.ts";
import Pagination from "../Pagination/Pagination.tsx";

function ProductsList () {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const role_permissions:boolean = localStorage.getItem(ROLE)=='Marketers';
    const [endpoint, setEndpoint] = useState(PRODUCT_ENDPOINT);
    const [count, setCount] = useState(0);


    useEffect(() => {
        setLoading(true)
        const getAllProducts = async ()=>{
            try{
                const res = await getAll(endpoint);
                setProducts(res.results);
                setCount(res.count)
            }catch (e){
                console.error(e);
            }finally {
                setLoading(false);
            }

        }
        getAllProducts()
    }, [endpoint]);

    return <div className='wrapper'>
        {loading && <Loader />}
        <div className='title__wrapper'>
            <h1 className='title'>Услуги</h1>
            <button disabled={!role_permissions} className='button add-button' onClick={()=>navigate('create')}>Добавить</button>
        </div>
        <div className='cards-container'>
            {products.map((cur :{id:number, name:'', description:'', cost: '', is_active:false}  , index : number) => {
                return <ProductCard key={index} product={cur} />})}
        </div>
        <Pagination count={count} endpoint={PRODUCT_ENDPOINT} setEndpoint={setEndpoint}/>
    </div>
}
export default ProductsList;
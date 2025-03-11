import api from '../../../api.ts'
import Loader from "../../Loader/Loader.tsx";
import {useEffect, useState} from "react";
import ProductCard from "./ProductCard.tsx";
import {useNavigate} from "react-router-dom";

function ProductsList () {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    async function getAllProducts() {
        try {
            setLoading(true)
            const res = await api.get('/api/products/')
            setProducts(res.data)
        } catch (e: any) {
            console.log(e);
            setError(e)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllProducts()
    }, []);

    return <div className='wrapper'>
        {error && <p>{error}</p>}
        {loading && <Loader />}
        <div className='title__wrapper'>
            <h1 className='title'>Услуги</h1>
            <button className='button add-button' onClick={()=>navigate('create')}>Добавить</button>
        </div>
        <div className='cards-container'>
            {products.map((cur :{name:'', description:'', cost: '', is_active:false}  , index : number) => {
                return <ProductCard key={index} product={cur} index={index+1} />})}
        </div>
        <div className='pagination__buttons'>
            <button className='button'>Назад</button>
            <button className='button'>Вперед</button>
        </div>
    </div>
}
export default ProductsList;
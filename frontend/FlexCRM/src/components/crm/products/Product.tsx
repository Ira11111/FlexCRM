import {useNavigate, useParams} from "react-router-dom";
import api from '../../../api'
import {useEffect, useState} from "react";


function Product() {
    const navigate = useNavigate();
    const params = useParams();
    const id : string= params.productId || '';
    const [product, setProduct] = useState({name:'', description:'', cost: '', is_active:false});

    async function getProduct(id : string) {
        try{
            const res = await api.get(`/api/products/${id}/`)
            setProduct(res.data)

        }catch (e){
            console.log(e)
        }
    }

    useEffect(() => {
        getProduct(id);
    }, [id])
    return <div className='wrapper'>
        <h1 className='title'>Услуга {product.name}</h1>
        <span>
            {product.description && <h2 className='subtitle'>Описание</h2>}
            {product.description && <p className='description'>{product.description}</p>}
        </span>

        <span>
            <h2 className='subtitle'>Стоимость</h2>
            <p>{product.cost}</p>
        </span>

        <button  className='button edit__button' onClick={()=>navigate('edit', {state : {product}})}>Редактировать</button>
    </div>
}

export default Product;
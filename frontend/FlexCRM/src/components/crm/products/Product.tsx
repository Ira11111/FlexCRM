import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ROLE} from "../../../constants.ts";
import {getById, productProps} from "../../../fetchData.ts";


function Product() {
    const role_permissions = localStorage.getItem(ROLE)=='Marketers';
    const navigate = useNavigate();
    const params = useParams();
    const id : string= params.productId || '';
    const [product, setProduct] = useState<productProps>({cost: 0, description: "", id: 0, is_active: false, name: ""});

    async function getProduct(id : string) {
        try{
            const res = await getById<productProps>(`/api/products/`, id)
            if (res)setProduct(res)
        }catch (e){
            console.log(e)
        }
    }

    useEffect(() => {
        getProduct(id);
    }, [id])

    return <main className='wrapper'>
        <h1 className='title'>Услуга {product.name}</h1>
        <span>
            {product.description && <h2 className='subtitle'>Описание</h2>}
            {product.description && <p className='description'>{product.description}</p>}
        </span>

        <span>
            <h2 className='subtitle'>Стоимость</h2>
            <p>{product.cost}</p>
        </span>
        <button className={'button edit__button'} onClick={()=>navigate('ads', {state:{product}})}>Просмотреть рекламы</button>
        <button disabled={!role_permissions} className='button edit__button' onClick={()=>navigate('edit', {state : {product}})}>Редактировать</button>
    </main>
}

export default Product;
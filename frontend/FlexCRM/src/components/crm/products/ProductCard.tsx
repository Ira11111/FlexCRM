import {useNavigate} from "react-router-dom";

interface ProductProps {
    id:number,
    name: string,
    description: string,
    cost: string,
    is_active: boolean
}

function ProductCard({product}: { product: ProductProps}) {
    const navigate = useNavigate();
    const {name, description} = product;
    return <article className='card'>
        <div className='card__info'>
            <h2 className='card__title'>{name}</h2>
            <p className='card__descr'>{description}</p>
        </div>
        <button onClick={()=>navigate(`/crm/products/${product.id}`)} className='button' >Подробнее</button>

    </article>
}

export default ProductCard;
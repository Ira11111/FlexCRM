import {useNavigate} from "react-router-dom";

interface ProductProps {
    name: string,
    description: string,
    cost: string,
    is_active: boolean
}

function ProductCard({product , index}: { product: ProductProps, index :number}) {
    const navigate = useNavigate();
    let {name, description} = product;
    return <div className='card'>
        <div className='card__info'>
            <h2 className='card__title'>{name}</h2>
            <p className='card__descr'>{description}</p>
        </div>
        <button onClick={()=>navigate(`${index}`)} className='button'>Подробнее</button>

    </div>
}

export default ProductCard;
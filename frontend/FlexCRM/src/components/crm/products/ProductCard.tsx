import {useNavigate} from "react-router-dom";

interface ProductProps {
    name: string,
    description: string,
    cost: string,
    is_active: boolean
}

function ProductCard({product , index, role_permissions}: { product: ProductProps, index :number, role_permissions:boolean}) {
    const navigate = useNavigate();
    let {name, description} = product;
    return <div className='card'>
        <div className='card__info'>
            <h2 className='card__title'>{name}</h2>
            <p className='card__descr'>{description}</p>
        </div>
        <button onClick={()=>navigate(`${index}`, {state:{role_permissions}})} className='button' >Подробнее</button>

    </div>
}

export default ProductCard;
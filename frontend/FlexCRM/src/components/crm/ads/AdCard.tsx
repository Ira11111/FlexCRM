import {useNavigate} from "react-router-dom";


interface AdProps {
    id:number;
    name:string,
    budget:string,
    customers_count:string,
    profit:string,
    product:[]
}

function AdCard({ad}:{ad:AdProps}) {

    const navigate = useNavigate();
    return <div className='card'>
        <div className='card__info'>
            <h2 className='card__title'>{ad.name}</h2>
            <p className='card__descr'>{ad.budget}</p>
        </div>
        <button onClick={()=>navigate(`${ad.id}`, {state:{ad}})} className='button'>Подробнее</button>

    </div>
}

export default AdCard;
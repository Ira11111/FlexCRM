import {useNavigate} from "react-router-dom";


interface AdProps {
    name:string,
    budget:string,
    leads_count:string,
    customers_count:string,
    profit:string,
    product:number
}

function AdCard({ad, index}:{ad:AdProps, index:number}) {

    const navigate = useNavigate();
    return <div className='card'>
        <div className='card__info'>
            <h2 className='card__title'>{ad.name}</h2>
            <p className='card__descr'>{ad.budget}</p>
        </div>
        <button onClick={()=>navigate(`${index}`, {state:{ad}})} className='button'>Подробнее</button>

    </div>
}

export default AdCard;
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
    let {name, budget} = ad;
    return <div className='card'>
        <div className='card__info'>
            <h2 className='card__title'>{name}</h2>
            <p className='card__descr'>{budget}</p>
        </div>
        <button onClick={()=>navigate(`${index}`)} className='button'>Подробнее</button>

    </div>
}

export default AdCard;
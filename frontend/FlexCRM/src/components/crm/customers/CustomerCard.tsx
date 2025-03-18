import {useNavigate} from "react-router-dom";

interface CustomerProps {
    id: string;
    name: string;
    lead: number;
    is_active: boolean;
}

function CustomerCard({customer}:{customer:CustomerProps}) {
    const navigate = useNavigate();
    return (
        <div className='card'>
            <h1 className={'card__title'}>{customer.name}</h1>
            <button onClick={()=>navigate(`${customer.id}`,{state:{customer}})} className='button'>Подробнее</button>
        </div>
    );
}

export default CustomerCard;
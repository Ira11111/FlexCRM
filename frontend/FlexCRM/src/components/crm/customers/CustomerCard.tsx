import {useNavigate} from "react-router-dom";
import {customerProps} from "../../../fetchData.ts";

function CustomerCard({customer}:{customer:customerProps}) {
    const navigate = useNavigate();
    return (
        <div className='card'>
            <h1 className={'card__title'}>{customer.name}</h1>
            <button onClick={()=>navigate(`${customer.id}`,{state:{customer}})} className='button'>Подробнее</button>
        </div>
    );
}

export default CustomerCard;
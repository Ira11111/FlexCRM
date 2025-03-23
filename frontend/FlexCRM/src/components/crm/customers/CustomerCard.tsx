import {useNavigate} from "react-router-dom";

interface CustomerProps {
    name: string;
    lead: number;
    is_active: boolean;
}

function CustomerCard({role_permissions, customer, index}:{role_permissions:boolean,customer:CustomerProps, index:number}) {
    const navigate = useNavigate();
    return (
        <div className='card'>
            <h1>{customer.name}</h1>
            <button onClick={()=>navigate(`${index+1}`, {state:{role_permissions}})} className='button'>Подробнее</button>
        </div>
    );
}

export default CustomerCard;
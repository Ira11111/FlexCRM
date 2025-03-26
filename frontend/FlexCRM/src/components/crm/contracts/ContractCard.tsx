import {contractProps} from "../../../fetchData.ts";
import {useNavigate} from "react-router-dom";



function ContractCard({contract}:{contract: contractProps}   ) {
    const navigate = useNavigate();

    return (
        <div className={'card'}>
            <h2 className={'card__title'}>{contract.name}</h2>
            <p className={'card__descr'}>{(contract.start_date||'').toString()} — {(contract.end_date||'').toString()}</p>
            <button onClick={()=>navigate(`${contract.id}`)} className='button'>Подробнее</button>
        </div>
    );
}

export default ContractCard;
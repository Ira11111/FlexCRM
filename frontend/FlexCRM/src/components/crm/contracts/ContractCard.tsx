import {contractProps} from "../../../fetchData.ts";
import {useNavigate} from "react-router-dom";



function ContractCard({contract}:{contract: contractProps}   ) {
    const navigate = useNavigate();

    return (
        <article className={'card'}>
            <div className={'card__info'}>
                <h2 className={'card__title'}>{contract.name}</h2>
                <p className={'card__descr'}>{(contract.start_date||'').toString()} — {(contract.end_date||'').toString()}</p>
            </div>

            <button onClick={()=>navigate(`/crm/contracts/${contract.id}`)} className='button'>Подробнее</button>
        </article>
    );
}

export default ContractCard;
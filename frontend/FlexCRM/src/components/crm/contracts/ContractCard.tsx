import {useEffect, useState} from "react";
import {getById} from "../../../fetchData.ts";
import {useNavigate} from "react-router-dom";

interface ContractProps {
    id: string;
    name: string;
    start_date: Date;
    end_date: Date;
    cost: number;
    contr_file: string;
    company: number;
    product: number;
}

function ContractCard({contract}:{contract: ContractProps}   ) {
    const [customer, setCustomer] = useState({});
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    const getProductAndCustomer = async (): Promise<any> => {
        try{
            const resProduct = await getById('/api/products/', contract.product)
            setProduct(resProduct)
            const resCustomer = await getById('/api/customers/', contract.company)
            setCustomer(resCustomer)
        }catch (e){
            console.error(e);
        }
    }
    useEffect(() => {
        getProductAndCustomer()
    }, [contract.id]);

    return (
        <div className={'card'}>
            <h2 className={'card__title'}>{contract.name}</h2>
            <p className={'card__descr'}>Клиент: {customer.name}</p>
            <p className={'card__descr'}>Услуга: {product.name}</p>
            <p className={'card__descr'}>{(contract.start_date||'').toString()} — {(contract.end_date||'').toString()}</p>
            <button onClick={()=>navigate(`${contract.id}`)} className='button'>Подробнее</button>
        </div>
    );
}

export default ContractCard;
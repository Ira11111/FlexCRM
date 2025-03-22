import {useEffect, useState} from "react";
import {contractProps, customerProps, getById, productProps} from "../../../fetchData.ts";
import {useNavigate} from "react-router-dom";



function ContractCard({contract}:{contract: contractProps}   ) {
    const [customer, setCustomer] = useState<{name:string}>({name:''});
    const [product, setProduct] = useState<{name:string}>({name:''});
    const navigate = useNavigate();

    const getProductAndCustomer = async (): Promise<any> => {
        try{
            const resProduct:productProps|undefined= await getById<productProps>('/api/products/', contract.product)
            if (resProduct) setProduct(resProduct)
            const resCustomer = await getById<customerProps>('/api/customers/', contract.company)
            if (resCustomer)setCustomer(resCustomer)
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
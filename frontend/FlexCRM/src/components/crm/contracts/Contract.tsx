import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {CONTRACT_ENDPOINT, CUSTOMER_ENDPOINT, PRODUCT_ENDPOINT, ROLE} from "../../../constants.ts";
import {getById} from "../../../fetchData.ts";
import {useEffect, useState} from "react";

function Contract(){
    const role_permissions= localStorage.getItem(ROLE) == "Managers";
    const id:string = useParams().contractId || '';
    const [customer, setCustomer] = useState({});
    const [product, setProduct] = useState({});
    const [contract, setContract] = useState({});
    const navigate = useNavigate();

    const getContract = async (): Promise<any> => {
        try{
            const resContract =await getById(CONTRACT_ENDPOINT, id)
            setContract(resContract)
            const resProduct = await getById(PRODUCT_ENDPOINT, resContract.product)
            setProduct(resProduct)
            const resCustomer = await getById(CUSTOMER_ENDPOINT, resContract.company)
            setCustomer(resCustomer)
        }catch (e){
            console.error(e);
        }
    }
    useEffect(() => {
        getContract()
    }, []);

    return <div className={'wrapper'}>
        <h1 className='title'>Контракт {contract.name}</h1>
        <span>
            <h2 className='subtitle'>Услуга, предоставляемая по контракту</h2>
            <p>{product.name} </p>
            <Link className={'link'} to={`/crm/products/${product.id}/`}>Подробнее</Link>
        </span>

        <span>
            <h2 className='subtitle'>Клиент, заключивший контракт</h2>
            <p>{customer.name} </p>
            <Link className={'link'} to={`/crm/customers/${customer.id}/`}>Подробнее</Link>
        </span>

        <span>
            <h2 className='subtitle'>Срок действия контракта</h2>
            <p>{(contract.start_date||'').toString()} — {(contract.end_date||'').toString()}</p>
        </span>

        <span>
            <h2 className='subtitle'>Стоимость контракта</h2>
            <p>{contract.cost}</p>
        </span>


        <a target={'_blank'} href={contract.contr_file}><button type={'button'} className={'button add-button'}>Скачать файл контракта</button></a>


        <button disabled={!role_permissions}  className='button edit__button' onClick={()=>navigate('edit', {state : {contract, customer, product}})}>Редактировать</button>

    </div>
}

export default Contract;
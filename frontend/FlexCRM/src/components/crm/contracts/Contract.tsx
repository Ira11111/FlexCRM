import {Link, useNavigate, useParams} from "react-router-dom";
import {CONTRACT_ENDPOINT, ROLE} from "../../../constants.ts";
import {contractProps, customerProps, getById, productProps} from "../../../fetchData.ts";
import {useEffect, useState} from "react";

function Contract(){
    const role_permissions= localStorage.getItem(ROLE) == "Managers";
    const id:string = useParams().contractId || '';
    const [customer, setCustomer] = useState<customerProps>({
        id:0,
        adds_info: [],
        contracts_info: [],
        description: "",
        lead_info: {
            last_name:'',
            first_name:'',
            email:'',
            phone:'',
            id:0
        },
        name: ""
    });
    const [product, setProduct] = useState<productProps>({cost: 0, description: "", id: 0, is_active: false, name: ""});
    const [contract, setContract] = useState<contractProps>({
        product_info: {id:0, name:'', cost:0, description:'', is_active:true},
        customer_info: {
            name:'', description:'', adds_info:[], contracts_info:[], lead_info:{
                first_name:'', phone:'', email:'', last_name:'', id:0
            }, id:0
        },
        contr_file: "",
        cost: 0,
        end_date: new Date(),
        id: 0,
        name: "",
        start_date: new Date()
    });
    const navigate = useNavigate();

    const getContract = async (): Promise<any> => {
        try{
            const resContract =await getById<contractProps>(CONTRACT_ENDPOINT, id)
            if (resContract) {setContract(resContract)
                setProduct(resContract.product_info)
                setCustomer(resContract.customer_info)
            }


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


        <button disabled={!role_permissions}  className='button edit__button' onClick={()=>navigate('edit', {state : {contract}})}>Редактировать</button>

    </div>
}

export default Contract;
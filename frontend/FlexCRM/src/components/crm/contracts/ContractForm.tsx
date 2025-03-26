import {FormEvent, useState} from "react";
import LiveSeach from "../../livesearch/LiveSeach.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {patch, post} from "../../../fetchData.ts";
import {CUSTOMER_ENDPOINT, PRODUCT_ENDPOINT} from "../../../constants.ts";


function ContractForm() {
    const contract = useLocation().state?useLocation().state.contract:undefined
    const [name, setName] = useState(contract?contract.name:'');
    const [start_date, setStartDate] = useState(contract?contract.start_date:new Date().toISOString().split('T')[0]);
    const [end_date, setEndDate] = useState(contract?contract.end_date:new Date().toISOString().split('T')[0]);
    const [cost, setCost] = useState(contract?contract.cost:'');
    const [companyId, setCompanyId] = useState(contract?[contract.customer_info.id]:[]);
    const [productId, setProductId] = useState(contract?[contract.product_info.id]:[]);
    const [contr_file, setContr_file]= useState<File | null>(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleContractSubmit = async (e:FormEvent) =>{
        e.preventDefault();
        setError('');
        if (new Date(start_date) > new Date(end_date)) {
            setError('Дата начала контракта не может быть позже даты окончания😈');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('start_date', start_date);
            formData.append('end_date', end_date);
            formData.append('cost', cost.toString());
            formData.append('company', companyId[0]);
            formData.append('product', productId[0]);
            if (contr_file) formData.append('contr_file', contr_file);
            contract?
                await patch('/api/contracts/',contract.id, formData)
                :
                await post('/api/contracts/', formData)

        }catch (e){
            setError("Контракт с этим клиентом уже заключен😈")
            console.log(e)
            return
        }
        navigate(-1);

    }

    return (
        <div className={'wrapper'}>
            <h1 className='title'>{contract?'Редактировать':'Создать'} контракт</h1>
            {error && <p className={'error-message'}>{error}</p>}

            <form className={'crm-form'} method={'post'} onSubmit={handleContractSubmit}>
                <label className={'label'} htmlFor={'name'}>Название контракта
                <input name={'name'} required type={"text"} className={'input'} id={'name'} value={name}
                       onChange={(e)=>setName(e.target.value)}
                       placeholder={'Введите название контракта'}/></label>

                <label htmlFor={'start_date'}>
                    Дата начала исполнения контракта:  <input name={'start_date'} required type={"date"} className={'input'} id={'start_date'} value={start_date}
                       onChange={(e)=>setStartDate(e.target.value)}/></label>
                <label  htmlFor={'end_date'}>
                    Дата окончания исполнения контракта:  <input name={'end_date'} required type={"date"} className={'input'} id={'end_date'} value={end_date}
                       onChange={(e)=>setEndDate(e.target.value)}/></label>

                <label className={'label'} htmlFor={'cost'}>Цена контракта
                <input name={'cost'} required type={"number"} className={'input'} id={'сost'} value={cost}
                       onChange={(e)=>setCost(e.target.value)}
                       placeholder={'Введите цену контракта'}/></label>
                 <label className={'label'}>Компания, заключившая контракт
                    <LiveSeach data={contract?[contract.customer_info]:[]} endpoint={CUSTOMER_ENDPOINT} maxItems={1} items={companyId} setItems={setCompanyId} placeholder={"Выберите компанию, с которой заключен контракт"}/>
                 </label>
                <label className={'label'}>Услуга, предоставляемая по контракту
                        <LiveSeach data={contract?[contract.product_info]:[]} endpoint={PRODUCT_ENDPOINT} maxItems={1} items={productId} setItems={setProductId} placeholder={"Выберите услугу для контракта"}/>
                </label>
                <label htmlFor={'file_contr'}>Выберите {contract && <span>новый</span>} файл контракта {contract && <span>(необязательно)</span>}</label>
                <input accept={'.pdf, .docx'} required={!contract} name={'contr_file'} id={'file_contr'} type={'file'} onChange={(e)=>{if(e.target.files)setContr_file(e.target.files[0])}}/>

                <button disabled={companyId.length==0||productId.length==0} className='auth-form__button button' type={"submit"} >{contract?'Редактировать':'Создать'}</button>

            </form>

        </div>
    );
}

export default ContractForm;
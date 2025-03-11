import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import api from "../../../api.ts";
import Loader from "../../Loader/Loader.tsx";


function ProductForm() {
    const navigate = useNavigate();
    const params = useParams();
    const editMode : boolean = params.productId != undefined
    const data = useLocation().state || null
    const [name, setName] = useState(data?data.product.name:'');
    const [description, setDescription] = useState(data?data.product.description:'');
    const [cost, setCost] = useState(data?data.product.cost:'');
    const [isActive, setIsActive] = useState(data?!data.product.is_active:true);
    const [loading, setLoading] = useState(false);



    async function handleSubmit() {
        try{
            setLoading(true);
            if (editMode) {
                await api.put(`/api/products/${params.productId}/`, {name, description, cost, isActive})
            } else {
                await api.post(`/api/products/`, {name, description, cost, isActive})
            }
        }catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false);
            navigate(-1)
        }

    }



    return (
        <div className='wrapper'>
            {loading && <Loader/>}
            <h1 className='title'>{editMode?'Редактировать':'Создать'} услугу</h1>
            <form className='crm-form' onSubmit={handleSubmit} method="post">
                <label hidden={true} htmlFor="name">Название</label>
                <input maxLength={50} className='input' required id={"name"} placeholder='Введите название'
                       type='text' value={name}
                       onChange={(e)=> setName(e.target.value)}/>
                <label hidden={true} htmlFor="description">Описание</label>
                <textarea className='input textarea' id={"description"} placeholder='Введите описание'
                        value={description}
                       onChange={(e)=> setDescription(e.target.value)}/>
                <label hidden={true} htmlFor="cost">Стоимость</label>
                <input className='input' required id={"cost"} placeholder='Введите стоимость'
                       type='number' value={cost}
                       onChange={(e)=> setCost(e.target.value)}/>
                <label className='pseudo-checkbox__label' htmlFor="active">
                    <input className='checkbox input visually-hidden'  id={"active"}
                           type='checkbox'
                           onChange={()=> setIsActive(false)}/>
                    <span className='pseudo-checkbox'></span>
                    <span className='checkbox__text'>Архивировать</span>
                </label>

                <button className='auth-form__button button' type={"submit"} >{editMode?'Редактировать':'Создать'}</button>
            </form>
        </div>
    );
}

export default ProductForm;
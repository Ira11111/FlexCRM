import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import Loader from "../../Loader/Loader.tsx";
import {post, put} from "../../../fetchData.ts";


function ProductForm() {
    const navigate = useNavigate();
    const params = useParams();
    const editMode : boolean = params.productId != undefined
    const data = useLocation().state || null
    const [name, setName] = useState(data?data.product.name:'');
    const [description, setDescription] = useState(data?data.product.description:'');
    const [cost, setCost] = useState(data?data.product.cost:'');
    const [isActive, setIsActive] = useState(data?data.product.is_active:true);
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        try{
            setLoading(true);
            if (editMode && params.productId) {
                await put(`/api/products/`,params.productId, {name, description, cost, is_active: isActive})
            } else {
                await post(`/api/products/`, {name, description, cost, is_active: isActive})
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
        <main className='wrapper'>
            {loading && <Loader/>}
            <h1 className='title'>{editMode?'Редактировать':'Создать'} услугу</h1>
            <form className='crm-form' onSubmit={handleSubmit} method="post">
                <label className={'label'} htmlFor="name">Название
                <input maxLength={50} className='input' required id={"name"} placeholder='Введите название'
                       type='text' value={name}
                       onChange={(e)=> setName(e.target.value)}/></label>
                <label className={'label'} htmlFor="description">Описание
                <textarea className='input textarea' id={"description"} placeholder='Введите описание'
                        value={description}
                       onChange={(e)=> setDescription(e.target.value)}/></label>
                <label className={'label'} htmlFor="cost">Стоимость
                <input className='input' required id={"cost"} placeholder='Введите стоимость'
                       type='number' value={cost}
                       onChange={(e)=> setCost(e.target.value)}/></label>
                <label className='pseudo-checkbox__label' htmlFor="active">
                    <input className='checkbox input visually-hidden'  id={"active"}
                           type='checkbox' checked={!isActive}
                           onChange={()=> setIsActive(!isActive)}/>
                    <span className='pseudo-checkbox'></span>
                    <span className='checkbox__text'>Архивировать</span>
                </label>
                <button className='auth-form__button button' type={"submit"} >{editMode?'Редактировать':'Создать'}</button>
            </form>
        </main>
    );
}

export default ProductForm;
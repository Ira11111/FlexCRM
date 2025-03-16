import {useEffect, useRef, useState} from "react";
import getAll from "../../fetchData.ts";

function LiveSeach({data, endpoint, items, setItems, placeholder}:{data?:{product:[]}, endpoint:string, items:[], setItems:([])=>void, placeholder:string}) {

    const [search, setSearch] = useState('');
    const [checkedItems, setCheckedItems] = useState(data?data.product:[]);
    const [result, setResult] = useState([]);
    const [tId, setTId] = useState(0);
    const [focus, setFocus] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchProductsByQuery = async () =>{
            try{
                const res = await getAll(`${endpoint}?search=${search}`)
                res?setResult(res.results):setResult([])
            }catch (e){
                console.log(e);
            }
        }
        clearTimeout(tId)
        setTId(setTimeout(()=>fetchProductsByQuery(), 1000));
    }, [search]);



    const addProduct = (curItem : {name:string, id:number})=>{
        if (items.indexOf(curItem.id)==-1){
            setItems([...items, curItem.id]);
            setCheckedItems([...checkedItems, curItem]);
            setFocus(false)
        }
    }

    const uncheckedProduct = (curItem)=>{
        setCheckedItems(checkedItems.filter((item) => item.id !== curItem.id))
        setItems(items.filter((id:number) => id !== curItem.id))
    }

    const handleClickOutside = (event:any) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setFocus(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className={'products'}>
            <ul className={'products__list-checked'}>
                {checkedItems.map((cur, index:number)=>{
                    return (<li tabIndex={0} className={'products__list-checked-item'} onClick={()=>{uncheckedProduct(cur)}}  key={index}>
                                <span className={'smert'}>
                                    {cur.name}
                                </span>
                    </li>)
                })}
            </ul>
            <div className={'input-cont'}>
                <input placeholder={placeholder} className={`input input__products ${focus}`} ref={containerRef} onFocus={()=> setFocus(true)} value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                {focus && <ul className={'products__list'}>
                    {result.map((cur, index)=>{
                        return (<li onKeyDown={(e)=>{if(e.key=='Enter')addProduct(cur)}} tabIndex={0} className={'products__list-item'} onClick={()=>addProduct(cur)} key={index}>{cur.name}</li>)
                    })}
                </ul>}
            </div>
        </div>
    );
}

export default LiveSeach;
import {RefObject, useEffect, useRef, useState} from "react";
import {getAll} from "../../fetchData.ts";

function LiveSeach({data, endpoint, items, setItems, placeholder, maxItems}:
                   {data?:{id:number,name:string}[], setQuery?:string, endpoint:string, items:number[],
                       setItems:(x:number[])=>void, placeholder:string, maxItems?:number}) {

    const [search, setSearch] = useState('');
    const [checkedItems, setCheckedItems] = useState<{name:string, id:number}[]>(data||[]);
    const [result, setResult] = useState([]);
    const [tId, setTId] = useState(0);
    const [focus, setFocus] = useState(false);
    const containerRef :RefObject<any> = useRef(null);

    useEffect(() => {
        const fetchProductsByQuery = async () =>{
            try{
                const res = await getAll(`${endpoint}?search=${search}&is_active=true`)
                res?setResult(res.results):setResult([])
            }catch (e){
                console.log(e);
            }
        }
        clearTimeout(tId)
        setTId(setTimeout(()=>fetchProductsByQuery(), 1000));
    }, [search]);



    const addItem = (curItem : {name:string, id:number})=>{
        if (items.indexOf(curItem.id)==-1){
            setItems([...items, curItem.id]);
            setCheckedItems([...checkedItems, curItem]);
            setFocus(false)
        }

    }

    const uncheckedItem = (curItem:{id:number})=>{
        setCheckedItems(checkedItems.filter((item:{id:number}) => item.id !== curItem.id))
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
                {checkedItems.map((cur:{id:number, name:string}, index:number)=>{
                    return (<li tabIndex={0} className={'products__list-checked-item'} onClick={()=>{uncheckedItem(cur)}}  key={index}>
                                <span className={'smert'}>
                                    {cur.name}
                                </span>
                    </li>)
                })}
            </ul>
            <div className={'input-cont'}>
                <input disabled={(maxItems && items.length>=maxItems)||false} placeholder={placeholder} className={`input input__products ${focus}`} ref={containerRef} onFocus={()=> setFocus(true)} value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                {focus && <ul className={'products__list'}>
                    {result.map((cur:{name:string, id:number}, index)=>{
                        return (<li onKeyDown={(e)=>{if(e.key=='Enter')addItem(cur)}} tabIndex={0} className={'products__list-item'} onClick={()=>addItem(cur)} key={index}>{cur.name}</li>)
                    })}
                    {result.length==0 && <li className={'products__list-item'}>Ничего не найдено</li>}
                </ul>}
            </div>
        </div>
    );
}

export default LiveSeach;
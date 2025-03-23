import {useEffect, useState} from "react";

function Search({endpoint, setEndpoint, params, curPage, setCurPage}:{endpoint: string, curPage:number, setCurPage:(x:number)=>void, setEndpoint:(x:string)=>void, params:{key:string, value:string}[]}) {
    const [order, setOrder] = useState('');
    const [query, setQuery] = useState('');
    const [tId, setTId] = useState(0);

    useEffect(() => {
        const handleSearch = () =>{
            const url = new URL(window.location.href);

            if(query){
                url.searchParams.delete('page')
                setCurPage(1)
                url.searchParams.set('search', query)
            } else {
                url.searchParams.delete('search')
            }

            if (order){
                url.searchParams.delete('page')
                setCurPage(1)
                url.searchParams.set('ordering', order)}
            else {
                url.searchParams.delete('ordering')
            }


            setEndpoint(endpoint+url.search);
        }
        clearTimeout(tId)
        setTId(setTimeout(()=>handleSearch(), 1000))
    }, [query, order]);

    useEffect(() => {
        const handleSearch = () =>{
            const url = new URL(window.location.href);

            if(curPage!=1 && curPage){
                url.searchParams.set('page', curPage.toString())}
            else {
                url.searchParams.delete('page')
            }
            if(query)url.searchParams.set('search', query)
            if(order)url.searchParams.set('ordering', order)


            setEndpoint(endpoint+url.search);
        }
        handleSearch()
    }, [curPage]);


    return (
        <div className={'search'}>
            <select className={'search__select'} defaultChecked={false}
                    onChange={e=>setOrder(e.target.value)}>
                <option tabIndex={1} className={'search__select-option'} key={0} value={''}>По умолчанию</option>
                {params.map((cur:{key:string, value:string}, i)=> <option tabIndex={1} className={'search__select-option'} key={i+1} value={cur.key}>{cur.value}</option>)}
            </select>
            <input className={'input'} value={query} onChange={e=>setQuery(e.target.value)} />
        </div>
    );
}

export default Search;
import {useEffect, useState} from "react";
import {PAGE_SIZE} from '../../../constants'
function Pagination({endpoint, count, setEndpoint}:{count: number, endpoint: string, setEndpoint:(x:string)=>void}) {
    const [page, setPage] = useState(1);
    const [curPage, setCurPage] = useState(1);
    const handlePaginate = (p: number) =>{
        setCurPage(p);
        setEndpoint(endpoint+"?page="+p);
    }

    useEffect(() => {
        setPage(Math.ceil(count/PAGE_SIZE))
    }, [count])

    return (
        <div className='pagination__buttons'>
            {Array.from(Array(page).keys()).map((_, i) => (
                <button key={i} disabled={curPage==i+1} className={'button '} onClick={()=>handlePaginate(i+1)}>{i+1}</button>
            ))}
        </div>
    );
}

export default Pagination;
import {useEffect, useState} from "react";
import {PAGE_SIZE} from '../../../constants'
function Pagination({count, curPage, setCurPage}:{count: number, curPage:number,  setCurPage:(x:number)=>void}) {
    const [page, setPage] = useState(1);
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(2);
    const [pages, setPages] = useState<number[]>([])

    useEffect(() => {
        setPage(Math.ceil(count/PAGE_SIZE))
        if (Math.ceil(count/PAGE_SIZE)>=2){
            setPages([1, 2])
        }
        else if (Math.ceil(count/PAGE_SIZE) !=0) {
            setPages([1])
        } else
        {
            setPages([])
        }
    }, [count])



    const handlePaginate = (p: number) => {
        setCurPage(p)
        setStart(Math.max(1, p - 1))
        setEnd(Math.min(page, p + 1))
        const newPages=[];
        for (let i = Math.max(1, p - 1); i <= Math.min(page, p + 1); i++) {
            newPages.push(i)
        }
        setPages(newPages)
    }


    return (
        <div className='pagination__buttons'>
            <button key={0} disabled={curPage==1} className={'button '} onClick={()=>handlePaginate(curPage-1)}>{'<'}</button>

            {start!=1 && page!=0 &&  (
                <>
                <button key={1} disabled={curPage==1} className={'button '} onClick={()=>handlePaginate(1)}>{1}</button>
                    {start>2 && <span className={'dots'}>...</span>}
                </>
            )}
            {pages.map((i) => (
                <button key={i} disabled={curPage==i} className={'button '} onClick={()=>handlePaginate(i)}>{i}</button>
            ))}
            {end!=page &&  page>1 &&(
                <>
                {end<page-1 && <span className={'dots'}>...</span>}
                    <button key={page} disabled={curPage==page} className={'button '} onClick={()=>handlePaginate(page)}>{page}</button>
                </>
            )}
            <button key={page+1} disabled={curPage==page} className={'button '} onClick={()=>handlePaginate(curPage+1)}>{'>'}</button>

        </div>
    );
}

export default Pagination;
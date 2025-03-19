import {useEffect, useState} from "react";
import {PAGE_SIZE} from '../../../constants'
function Pagination({endpoint, count, setEndpoint}:{count: number, endpoint: string, setEndpoint:(x:string)=>void}) {
    const [page, setPage] = useState(1);
    const [curPage, setCurPage] = useState(1);
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(2);
    const [pages, setPages] = useState([])

    useEffect(() => {
        setPage(Math.ceil(count/PAGE_SIZE))
        if (Math.ceil(count/PAGE_SIZE)>3){
            setPages([1, 2])
        }
        else {
            setPages([1])
        }
    }, [count])



    const handlePaginate = (p: number) => {
        setCurPage(p)
        if (endpoint.includes('page=')) {
            if (p == 1) {
                setEndpoint(endpoint.replace(/(&|\?){1}page=[0-9]+/, ''))
            } else {
                setEndpoint(endpoint.replace(/page=[0-9]+/, `page=${p}`))
            }
        } else if (endpoint.includes('?')) {
            setEndpoint(endpoint + `&page=${p}`)
        } else {
            setEndpoint(endpoint + `?page=${p}`)
        }
        console.log(start, end)
        console.log(Math.max(1, p - 1), Math.min(page, p + 1))
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
            {start!=1 && (
                <>
                <button key={1} disabled={curPage==1} className={'button '} onClick={()=>handlePaginate(1)}>{1}</button>
                    <span className={'dots'}>...</span>
                </>
            )}
            {pages.map((i) => (
                <button key={i} disabled={curPage==i} className={'button '} onClick={()=>handlePaginate(i)}>{i}</button>
            ))}
            {end!=page && (
                <>
                    <span className={'dots'}>...</span>

                <button key={page} disabled={curPage==page} className={'button '} onClick={()=>handlePaginate(page)}>{page}</button>
                </>
            )}
        </div>
    );
}

export default Pagination;
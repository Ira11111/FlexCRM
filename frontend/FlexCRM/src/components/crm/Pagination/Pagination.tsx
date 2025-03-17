function Pagination({previous, next, setEndpoint}:{previous:string, next:string, setEndpoint:(e:string)=>void}) {
    return (
        <div className='pagination__buttons'>
            <button disabled={!previous} onClick={()=>setEndpoint(previous)} className='button'>Назад</button>
            <button disabled={!next} onClick={()=>setEndpoint(next)} className='button'>Вперед</button>
        </div>
    );
}

export default Pagination;
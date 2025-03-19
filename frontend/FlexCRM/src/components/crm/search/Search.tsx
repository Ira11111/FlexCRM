import {useState} from "react";

function Search({endpoint, setEndpoint, params}:{endpoint: string, setEndpoint:(x:string)=>void, params:[{x:string, y:string}]}) {
    const [order, setOrder] = useState('');
    const [query, setQuery] = useState('');

    const handleSearch = () =>{

        let newEndpoint = endpoint;
        if (order) {
            if (endpoint.includes('ordering=')) {
                newEndpoint = newEndpoint.replace(/order=[a-z]+/, `ordering=${order}`);
            } else if (endpoint.includes('?')) {
                const index = endpoint.indexOf('?');
                newEndpoint = endpoint.substring(0, index+1) + `ordering=${order}&` + endpoint.substring(index+1)
            } else {
                newEndpoint = endpoint + `?ordering=${order}`
            }
        }
        if(query) {
            setQuery(query.toLowerCase());
            if (endpoint.includes('search=')) {
                newEndpoint = newEndpoint.replace(/search=[a-z0-9]+/, `search=${query}`);
            } else if (endpoint.includes('?')) {
                const index = endpoint.indexOf('?');
                newEndpoint = endpoint.substring(0, index+1) + `search=${query}&` + endpoint.substring(index+1)
            } else {
                newEndpoint = endpoint + `?search=${query}`
            }
        }
        setEndpoint(newEndpoint)
    }

    return (
        <div>
            <select defaultChecked={false}
                    onChange={e=>setOrder(e.target.value)}>
                <option key={0}value={''}>По умолчанию</option>
                {params.map((cur, i)=> <option key={i+1} value={cur.key}>{cur.value}</option>)}
            </select>
            <input className={'input'} value={query} onChange={e=>setQuery(e.target.value)} />
            <button onClick={handleSearch} className={'button'}>Поиск</button>
        </div>
    );
}

export default Search;
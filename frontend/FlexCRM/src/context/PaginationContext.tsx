import {createContext, useContext, useState} from "react";
import {Outlet} from "react-router-dom";

type PaginationContextProps = {
    endpoint: string;
    setEndpoint: (v: string) => void;
    next:string;
    previous:string;
    updatePagination: ({previous, next}:{previous:string, next:string}) => void;
}

const PaginationContext = createContext<PaginationContextProps | undefined>(undefined);

export const usePagination = () => {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error('usePagination must be used within a PaginationProvider');
    }
    return context;
};


export function PaginationProvider({initialEndpoint}:{initialEndpoint:string}){
    const [endpoint, setEndpoint] = useState<string>(initialEndpoint);
    const [previous, setPrevious] = useState('');
    const [next, setNext] = useState('');

    const updatePagination = (data:{previous:string, next:string}) => {
        setNext(data.next);
        setPrevious(data.previous);
    }

    return (
        <PaginationContext.Provider value={{endpoint, setEndpoint, next, previous, updatePagination}}>
            <Outlet/>
        </PaginationContext.Provider>
    )
}
import Loader from "../../Loader/Loader.tsx";
import {useEffect, useState} from "react";
import Lead from "./Lead.tsx";
import api from "../../../api.ts";

function LeadsList() {
    const [loading, setLoading] = useState(false);
    const [leads, setLeads] = useState([]);
    async function getLeads() {
        try{
            setLoading(true);
            const res = await api.get('api/leads/');
            setLeads(res.data);
        }catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false);

        }
    }

    useEffect(() => {
        getLeads();
    }, []);

    return <div className='wrapper'>
        {loading && <Loader />}
        <div className='title__wrapper'>
            <h1 className='title'>Услуги</h1>
        </div>
        <div className='cards-container'>
            {leads.map((cur :{first_name:'', last_name:'', phone: '', email:''}  , index : number) => {
                return <Lead key={index} l={cur} index={index+1} />})}
        </div>
        <div className='pagination__buttons'>
            <button className='button'>Назад</button>
            <button className='button'>Вперед</button>
        </div>
    </div>
}

export default LeadsList;
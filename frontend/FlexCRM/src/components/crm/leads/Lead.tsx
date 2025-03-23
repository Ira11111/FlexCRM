import {useEffect, useState} from "react";
import api from "../../../api.ts";

function Lead({l}:{l?:{id: string, first_name:string, last_name:string, phone:string,  email:string;}}) {
   const [lead, setLead] = useState(l||{first_name:'', last_name:'', phone: '', email:''})
    async function getLead(){
        try {
            const res = await api.get(`/api/leads/${index}/`)
            setLead(res.data.results)
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (!l) {
            getLead()
        }
        else{
            setLead(l)
        }
    }, [l]);


    return <div className={'lead'}>
        <h2 className='lead__title'>Представитель</h2>
        <p className={'lead__name'}>{lead.first_name} {lead.last_name}</p>
        <span>
            <h2 className='subtitle'>Телефон</h2>
            <p>{lead.phone}</p>
        </span>
        <span>
            <h2 className='subtitle'>Электронная почта</h2>
            <p>{lead.email}</p>
        </span>

    </div>
}

export default Lead;
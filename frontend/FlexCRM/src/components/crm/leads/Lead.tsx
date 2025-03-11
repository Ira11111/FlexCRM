import {useEffect, useState} from "react";
import api from "../../../api.ts";

function Lead({l, index}:{l?:{first_name:string, last_name:string, phone:string,  email:string;}, index?:number}) {
   const [lead, setLead] = useState(l||{first_name:'', last_name:'', phone: '', email:''})
    async function getLead(){
        try {
            const res = await api.get(`/api/leads/${index}/`)
            setLead(res.data)
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (!l) {
            getLead()
        }
    }, [l]);


    return <div>
        <h2 className='title'>Представитель компании</h2>
        <p>{lead.first_name} {lead.last_name}</p>
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
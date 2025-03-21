import {ROLE} from "../../constants.ts";
import {useNavigate} from "react-router-dom";
import {getAll} from "../../fetchData.ts";
import {useEffect, useState} from "react";
import { BarChart } from '@mui/x-charts/BarChart';

function Statistic() {
    const role_permissions = localStorage.getItem(ROLE)=="Admins";
    const navigate = useNavigate();
    const [adds_customers, setAdds_customers] = useState([]);
    const [adds_profit, setAdds_profits] = useState([]);
    const [customers, setCustomers] =useState([]);
    const [products, setProducts] = useState([]);

    const getStatistics = async () => {
        try {
            const res = await getAll('/api/statistics/');
            setAdds_customers(res.adds_customers)
            setAdds_profits(res.adds_profit)
            setCustomers(res.customers)
            setProducts(res.products)
        }catch (e) {

        }
    }

    useEffect(() => {
        getStatistics()
    }, []);

    return <div className={'wrapper'}>
        {role_permissions && <button className={'button add-button'} onClick={()=>navigate('createUser')}>Добавить работника</button>}
        {/*<BarChart series={adds_customers}/>*/}
    </div>

}

export default Statistic;
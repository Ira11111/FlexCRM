import {ROLE} from "../../constants.ts";
import {Link, useNavigate} from "react-router-dom";
import {getAll} from "../../fetchData.ts";
import {useEffect, useState} from "react";
import Loader from "../Loader/Loader.tsx";

function Statistic() {
    const role_permissions = localStorage.getItem(ROLE)=="Admins";
    const navigate = useNavigate();
    const [adds_customers, setAdds_customers] = useState([]);
    const [adds_profit, setAdds_profits] = useState([]);
    const [customers, setCustomers] =useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getStatistics = async () => {
        try {
            setLoading(true);
            const res = await getAll('/api/statistics/');
            setAdds_customers(res.adds_customers)
            setAdds_profits(res.adds_profit)
            setCustomers(res.customers)
            setProducts(res.products)
            console.log(res)
        }catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getStatistics()
    }, []);

    function getCompStatistic(data:[],  title:string, endpoint:string,detail?:string,  description?:string) {
        if (!data || data.length === 0) {
            return <p>Нет данных для отображения</p>;
        }

        return <div className={'statistic-item'}>
            <h2 className={'subtitle'}>{title}</h2>

            <ul className={'statistic__list'}>
                {data.map(((cur, index)=>{
                    return <li key={index} className={'statistic__list-item card'}>
                        <h3 className={'statistic__list-item-title'}>{cur.name}</h3>
                        {detail && <>{description}: {cur[detail]}</>}
                        <Link className={'link'} to={`${endpoint}${cur.id}`}>Перейти</Link>
                    </li>
                }))}
            </ul>
        </div>
    }


    return <div className={'wrapper'}>
        {loading && <Loader/>}
        {role_permissions && <button className={'button add-button'} onClick={()=>navigate('createUser')}>Добавить работника</button>}
        <h1 className={'title text-effect'}>Статистика</h1>
        <div className={'statistic'}>
            {getCompStatistic(adds_profit, 'Самые прибыльные рекламные компании','/crm/ads/', 'profit', 'Прибыль')}
            {getCompStatistic(adds_customers, `Самые успешные рекламные компании`, '/crm/ads/','customers_count', 'Новых клиентов')}
            {getCompStatistic(customers, <>Самые <span className="text-effect">wow </span>клиенты</>, '/crm/customers/')}
            {getCompStatistic(products, "Самые продаваемые услуги", '/crm/products/')}
        </div>
    </div>

}

export default Statistic;
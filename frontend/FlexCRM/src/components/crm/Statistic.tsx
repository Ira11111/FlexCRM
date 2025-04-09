import {Link}from "react-router-dom";

import {adProps, customerProps, getStatistic, productProps} from "../../fetchData.ts";

import {useEffect, useState} from "react";
import Loader from "../Loader/Loader.tsx";

function Statistic() {
    const [adds_customers, setAdds_customers] = useState([]);

    const [adds_profit, setAdds_profits] = useState<adProps[]>([]);
    const [customers, setCustomers] =useState<customerProps[]>([]);
    const [products, setProducts] = useState<productProps[]>([]);
    const [loading, setLoading] = useState(false);

    const getStatistics = async () => {
        try {
            setLoading(true);
            const res:{adds_customers:[], customers:[], products:[], adds_profit:[]}|undefined = await getStatistic();
            if (res){
                setAdds_customers(res.adds_customers)
                setAdds_profits(res.adds_profit)
                setCustomers(res.customers)
                setProducts(res.products)
            }
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



    function getCompStatistic<T extends (adProps|customerProps|productProps)>(data:T[],  title:string, endpoint:string,detail?: keyof T,  description?:string) {


        return <div className={'statistic-item'}>
            <h2 className={'subtitle'}>{title}</h2>
            {data.length == 0 && <p>Нет данных для отображения</p>}

            {data.length !==0 && <ul className={'statistic__list'}>

                {data.map(((cur:T, index)=>{

                    return <li key={index} className={'statistic__list-item card'}>
                        <h3 className={'statistic__list-item-title'}>{cur.name}</h3>
                        {detail && <>{description}: {cur[detail]}</>}
                        <Link className={'link'} to={`${endpoint}${cur.id}`}>Перейти</Link>
                    </li>
                }))}
            </ul>}
        </div>
    }


    return <div className={'wrapper'}>
        {loading && <Loader/>}
        <h1 className={'title text-effect'}>Статистика</h1>
        <div className={'statistic'}>
            {getCompStatistic<adProps>(adds_profit, 'Самые прибыльные рекламные компании', '/crm/ads/', 'profit', 'Прибыль')}
            {getCompStatistic<adProps>(adds_customers, `Самые успешные рекламные компании`, '/crm/ads/','customers_count', 'Новых клиентов')}
            {getCompStatistic<customerProps>(customers, 'Самые wow клиенты', '/crm/customers/')}
            {getCompStatistic<productProps>(products, "Самые продаваемые услуги", '/crm/products/')}

        </div>
    </div>

}

export default Statistic;
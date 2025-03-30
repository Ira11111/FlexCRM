import './crm.css'
import {Outlet} from "react-router-dom";

import Header from '../../components/crm/header/Header.tsx'


function Crm() {

    return (

        <>
            <Header/>
            <Outlet/>
            </>

    );
}

export default Crm;
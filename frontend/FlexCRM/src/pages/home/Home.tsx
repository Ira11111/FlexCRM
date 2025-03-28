import { Outlet } from 'react-router-dom';
import './home.css'
import Header from "../../components/home/Header.tsx";

function Home() {
    return (
        <>
            <Header/>
            <Outlet/>




        </>
    );
}

export default Home;
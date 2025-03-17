import {jwtDecode, JwtPayload} from "jwt-decode";
import {Navigate} from "react-router-dom";
import api from '../api'
import {REFRESH_TOKEN, ACCESS_TOKEN} from "../constants.ts";
import {ReactNode, useState, useEffect} from "react";
import Loader from "./Loader/Loader.tsx";


function ProtectedRoute({children}: {children: ReactNode}) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(()=>{
        auth().catch(()=>setIsAuthorized(false))
        const intervalId = setInterval(() => {
            refresh().catch(() => setIsAuthorized(false));
        }, 300000);
        return () => clearInterval(intervalId);
    }, [])



    const refresh = async () : Promise<void> => {
        const refreshToken : string | null = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
            console.error("Refresh token is missing");
            setIsAuthorized(false);
            return;
        }
        try {
            const res = await api.post('/auth/token/refresh/', {refresh: refreshToken });
            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true)
            }
            else {
                setIsAuthorized(false);
            }
        } catch (e){
            console.error(e);
            setIsAuthorized(false)
        }
    }

    const auth =  async () : Promise<void> => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token){
            setIsAuthorized(false);
            return;
        }
        const decoded : JwtPayload = jwtDecode(token);
        const tokenExpiration :number | undefined = decoded.exp;
        if (!tokenExpiration) {
            setIsAuthorized(false);
            return
        }
        if (tokenExpiration*1000 < Date.now()) {
            await refresh();
        } else {
            setIsAuthorized(true);
            return
        }
    }
    if (isAuthorized === null){
        return <Loader />
    }
    return isAuthorized ? children : <Navigate to="/login"/>
}
export default ProtectedRoute;
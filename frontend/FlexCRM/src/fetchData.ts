import api from './api'
import {ACCESS_TOKEN, REFRESH_TOKEN, ROLE} from "./constants.ts";
import {jwtDecode} from "jwt-decode";

export interface productProps {
        id: number;
        description: string;
        name: string;
        cost: number;
        is_active:boolean;
}

export interface adProps {
        name: string;
        id: number;
        budget: number;
        customers_count: number;
        profit:number;
        product: [];
}

export interface contractProps {
        id: number;
        name: string;
        start_date: Date;
        end_date: Date;
        cost: number;
        contr_file: string;
        company: number;
        product: number;
}

export interface leadProps {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        id: number;
}


export interface customerProps {
        name: string;
        lead_info: leadProps;
        description: string;
        adds_info:[];
        contracts_info:[]
        id:number
}

export async function getAll(endpoint:string):Promise<{results:[], count:number}|undefined >{
        const res = await api.get(endpoint);
        return res.data
}

export async function getById<T>(endpoint : string ,id: number|string ):Promise<T|undefined> {
        const res = await api.get(`${endpoint}${id}/`);
        return res.data
}


export async function put(endpoint:string, id:number|string, data:{}):Promise<any[]|undefined> {
        const res = await api.put(`${endpoint}${id}/`, data);
        return res.data;
}

export async function patch(endpoint:string, id:number|string, data:{}):Promise<any[]|undefined> {
        const res = await api.patch(`${endpoint}${id}/`, data);
        return res.data;

}

export async function post<T>(endpoint:string, data:{}):Promise<T|undefined> {
        const res = await api.post(endpoint, data)
        return res.data
}

export async function register(endpoint:string, data:{}):Promise<{access:string, refresh:string}|undefined> {
        const res = await api.post(endpoint, data)
        return res.data
}

export async function getTokens({username, password}:{username:string, password:string}){
        const resTokens:{access:string, refresh:string}|undefined = await register('/auth/token/obtain/', {username, password})
        if (resTokens){
                localStorage.setItem(ACCESS_TOKEN, resTokens.access);
                localStorage.setItem(REFRESH_TOKEN, resTokens.refresh);
                const role:{user_group:string} = jwtDecode(resTokens.access)
                localStorage.setItem(ROLE, role.user_group)
        }
}

export async function getStatistic():Promise<{adds_profit:[], customers:[], products:[], adds_customers:[]}|undefined>{
        const res = await api.get('/api/statistics/');
        return res.data
}

import api from './api'

export async function getAll(endpoint:string):Promise<any[]|undefined >{
        const res = await api.get(endpoint);
        return res.data
}

export async function getById(endpoint : string ,id: number|string ):Promise<{}|undefined> {
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

export async function post(endpoint:string, data:{}):Promise<any[]|undefined> {
        const res = await api.post(endpoint, data)
        return res.data
}



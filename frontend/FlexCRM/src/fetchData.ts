import api from './api'

export default async function getAll(endpoint:string){
    try {
        const res = await api.get(endpoint);
        return res.data
    } catch (e: any) {
        console.log(e);
    }
}

// export async function getById(id: number, endpoint : string){
//     try {
//         const res = await api.get(`${endpoint}${id}/`);
//         return res.data
//     }catch (e) {
//         console.log(e);
//     }
// }
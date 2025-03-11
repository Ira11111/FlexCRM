import api from './api'

export async function getAllProducts(){
    try {
        const res = await api.get('/api/products/')
        return res.data
    } catch (e: any) {
        console.log(e);
    }
}

export async function getProductById(id: number){
    try {
        const res = await api.get(`/api/products/${id}/`);
        return res.data
    }catch (e) {
        console.log(e);
    }
}
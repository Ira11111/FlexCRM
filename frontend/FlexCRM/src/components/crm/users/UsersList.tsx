import {getAll} from "../../../fetchData.ts";
import {ROLE, USERS_ENDPOINT} from "../../../constants.ts";
import Pagination from "../Pagination/Pagination.tsx";
import {useEffect, useState} from "react";
import UserCard from "./UserCard.tsx";
import {useNavigate} from "react-router-dom";


function UsersList() {
    const [users, setUsers]= useState([]);
    const [count, setCount]=useState(0);
    const [curPage, setCurPage]=useState(1);
    const role_permissions:boolean = localStorage.getItem(ROLE)=="Admins";
    const [endpoint, setEndpoint]=useState(USERS_ENDPOINT)
    const navigate = useNavigate()


    async function getAllUsers() {
        try {
            if (role_permissions){
                const res = await getAll(endpoint);
                if (res){
                    setUsers(res.results)
                    setCount(res.count)
                }
            } else {
                navigate('/crm')
            }

        }catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [endpoint]);

    return (
        <div className={'wrapper'}>
            <div className='title__wrapper'>
                <h1 className='title'>Работники</h1>
                <button disabled={!role_permissions} className='button add-button' onClick={()=>navigate('create')}>Добавить</button>
            </div>

            <div className='cards-container'>
                {users.map((cur, index : number) =>
                    <UserCard key={index} user={cur} />)}
                {users.length == 0 && <p>Ничего не найдено</p>}
            </div>
            <Pagination count={count} curPage={curPage} setCurPage={setCurPage} setEndpoint={setEndpoint} endpoint={USERS_ENDPOINT} />
        </div>
    );
}

export default UsersList;
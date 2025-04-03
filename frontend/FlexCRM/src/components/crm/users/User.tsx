import {useNavigate, useParams} from "react-router-dom";
import {ROLE, USERS_ENDPOINT} from "../../../constants.ts";
import {useEffect, useState} from "react";
import {getById, usersProps} from "../../../fetchData.ts";

function User() {
    const id:string = useParams().userId || '';
    const [user, setUser] = useState<usersProps>({group: {name: "", permissions: []}, email: "", username: "", pk:0});
    const role_permissions:boolean = localStorage.getItem(ROLE)=="Admins";
    const navigate = useNavigate();
    
    async function getUser(){
        try{
            if(role_permissions){
                const res:usersProps|undefined  = await getById<usersProps>(USERS_ENDPOINT, id)
                if (res){
                    setUser(res);
                }
            } else {
                navigate('/crm')
            }


        }catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return <div className='wrapper'>
        <h1 className='title'>Работник {user.username}</h1>

        <span>
            <h2 className='subtitle'>Почта</h2>
            <p>{user.email}</p>
        </span>
        <h2 className={'subtitle'}> Группа - {user.group.name}</h2>

        <div className={'info__wrapper'}>
            <h3 className={'permissions__list-title'}>Разрешения</h3>
            <ul className={'permissions__list'}>
                {user.group.permissions.map((item:string, i:number) => {
                    return <li className={'permissions__list-item'} key={i}>{item}</li>
                })}
            </ul>
        </div>



    </div>
}

export default User;
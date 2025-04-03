import {useNavigate} from "react-router-dom";
import {usersProps} from "../../../fetchData.ts";

function UserCard({user}:{user:usersProps}) {
    const navigate = useNavigate();
    return (
        <div className='card'>
            <h1 className={'card__title'}>{user.username}</h1>
            <button onClick={()=>navigate(`${user.pk}`,{state:{user}})} className='button'>Подробнее</button>
        </div>
    );
}

export default UserCard;
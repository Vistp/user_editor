import { User } from '../../types/types';
import s from './UserItem.module.scss';

const UserItem: React.FC<User> = ({ name, address, company }) => {
    return (
        <>
            <div className={s.UserItemWrapper}>
                <p className={s.UserInfo}><span>ФИО: </span>{name}</p>
                <p className={s.UserInfo}><span>город: </span>{address.city}</p>
                <p className={s.UserInfo}><span>компания: </span>{company.name}</p>
            </div>
            <button className={s.DetailsButton}>Подробнее</button>
        </>
    )
}

export default UserItem;
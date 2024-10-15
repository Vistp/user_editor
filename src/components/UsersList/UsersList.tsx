import React, { useState, useEffect } from 'react';
import UserItem from '../UserItem/UserItem';
import { User } from '../../types/types';
import s from './UsersList.module.scss';

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loader, setLoader] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoader(true);
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('Произошла ошибка загрузки данных')
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Произошла неизвестная ошибка');
                }
            } finally {
                setLoader(false);
            }
        };
        getUsers();
    }, []);

    if (loader) {
        return <p>Загрузка...</p>
    }
    if (error) {
        return <p>Ошибка: {error}</p>
    }

    return (
        <div className={s.UsersListWrapper}>
            <h1 className={s.UserListTitle}>Список пользователей</h1>
            <ul className={s.UsersList}>
                {users.map((el) => (
                    <li key={el.id} className={s.UserListItem}><UserItem {...el} /></li>
                ))}
            </ul>
            <p className={s.UserListInfo}>Найдено {users.length} пользователей</p>
        </div>
    )
}

export default UsersList;
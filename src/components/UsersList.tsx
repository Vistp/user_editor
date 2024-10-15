import React, { useState, useEffect } from 'react';
import UserItem from './UserItem';
import { User } from '../types/types';

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
                setError(error.message);
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
        <>
            <h1>Список пользователей</h1>
            <ul>
                {users.map((el) => (
                    <li key={el.id}><UserItem {...el} /></li>
                ))}
            </ul>
        </>
    )
}

export default UsersList;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import { User } from '../../types/types';
import { editUser } from '../../features/usersSlice';

interface UserEditorProps {
    id: string | undefined;
}
const UserEditor: React.FC<UserEditorProps> = ({ id }) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                setError('Не удалось загрузить данные пользователя');
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        if(id) {
            fetchUserData();
        }
        fetchUserData();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name.startsWith('address.')) {
            setUser((prevUser) => ({
                ...prevUser!,
                address: {
                    ...prevUser!.address,
                    [name.split('.')[1]]: value,
                },
            }));
        } else {
            setUser((prevUser) => ({
                ...prevUser!,
                [name]: value,
            }));
        }
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user) {
            dispatch(editUser(user));
            navigate('/');
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    if (!user) {
        return <div>Пользователь не найден.</div>;
    }
    return (
        <div>
            <h2>Профиль пользователя {id}</h2>
            <Button onClick={() => setIsEditing(true)} title={'Редактировать'}/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input 
                        type='text' 
                        name='name'
                        value={user.name} 
                        onChange={handleChange} 
                        disabled={!isEditing} 
                    />
                </div>
                <div>
                    <label>User Name:</label>
                    <input 
                        type='text' 
                        name='username' 
                        value={user.username} 
                        onChange={handleChange} 
                        disabled={!isEditing} 
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type='email' 
                        name='email' 
                        value={user.email} 
                        onChange={handleChange} 
                        disabled={!isEditing} 
                    />
                </div>
                <div>
                    <label>Street:</label>
                    <input 
                        type='text' 
                        name='address.street' 
                        value={user.address.street} 
                        onChange={handleChange} 
                        disabled={!isEditing} 
                    />
                </div>
                <div>
                    <label>City:</label>
                    <input 
                        type='text' 
                        name='address.city' 
                        value={user.address.city} 
                        onChange={handleChange} 
                        disabled={!isEditing} 
                    />
                </div>
                <div>
                    <label>Zip Code:</label>
                    <input 
                        type='text' 
                        name='address.zipcode' 
                        value={user.address.zipcode} 
                        onChange={handleChange} 
                        disabled={!isEditing} 
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input 
                        type='text'
                        name='phone' 
                        value={user.phone} 
                        onChange={handleChange} 
                        disabled={!isEditing} 
                    />
                </div>
                <div>
                    <label>Website:</label>
                    <input 
                        type='text' 
                        name='website'
                        value={user.website} 
                        onChange={handleChange} 
                        disabled={!isEditing} 
                    />
                </div>
                <div>
                    <label>Comment:</label>
                    <textarea 
                        name='comment' 
                        value={user.comment || ''} 
                        onChange={handleChange} 
                        disabled={!isEditing} 
                    />
                </div>
                <button type='submit' disabled={!isEditing}>Сохранить изменения</button>
            </form>
        </div>
    )
}

export default UserEditor;

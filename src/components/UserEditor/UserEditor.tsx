import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import { User } from '../../types/types';
import { editUser } from '../../features/usersSlice';

interface UserEditorProps {
    id: string | undefined;
}

const UserEditor: React.FC<UserEditorProps> = ({ id }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<User>();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setValue('name', data.name);
                setValue('username', data.username);
                setValue('email', data.email);
                setValue('address.street', data.address.street);
                setValue('address.city', data.address.city);
                setValue('address.zipcode', data.address.zipcode);
                setValue('phone', data.phone);
                setValue('website', data.website);
                setValue('comment', data.comment);
            } catch (error) {
                setError('Не удалось загрузить данные пользователя');
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUserData();
        }
    }, [id, setValue]);

    const onSubmit = (data: User) => {
        dispatch(editUser(data));
        navigate('/');
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Профиль пользователя {id}</h2>
            <Button onClick={() => setIsEditing(true)} title={'Редактировать'} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name:</label>
                    <input 
                        type='text' 
                        {...register('name', { required: true })} 
                        style={{ borderColor: errors.name ? 'red' : undefined }} 
                        disabled={!isEditing} 
                    />
                </div>
                <div>
                    <label>User Name:</label>
                    <input 
                        type='text' 
                        {...register('username', { required: true })} 
                        style={{ borderColor: errors.username ? 'red' : undefined }} 
                        disabled={!isEditing} 
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type='email' 
                        {...register('email', { required: true })} 
                        style={{ borderColor: errors.email ? 'red' : undefined }} 
                        disabled={!isEditing} 
                    />
                </div>
                <div>
                    <label>Street:</label>
                    <input 
                        type='text' 
                        {...register('address.street', { required: true })} 
                        style={{ borderColor: errors.address?.street ? 'red' : undefined }} 
                        disabled={!isEditing} 
                    />
                </div>
                <div>
                    <label>City:</label>
                    <input 
                        type='text' 
                        {...register('address.city', { required: true })} 
                        style={{ borderColor: errors.address?.city ? 'red' : undefined }}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label>Zip Code:</label>
                    <input 
                        type='text' 
                        {...register('address.zipcode', { required: true })} 
                        style={{ borderColor: errors.address?.zipcode ? 'red' : undefined }}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input 
                        type='text' 
                        {...register('phone', { required: true })} 
                        style={{ borderColor: errors.phone ? 'red' : undefined }}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label>Website:</label>
                    <input 
                        type='text' 
                        {...register('website', { required: true })}  
                        style={{ borderColor: errors.website ? 'red' : undefined }}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label>Comment:</label>
                    <textarea 
                        {...register('comment')}
                        disabled={!isEditing}
                    />
                </div>       
                <button type='submit' disabled={!isEditing}>Сохранить изменения</button>
            </form>
        </div>
    );
}

export default UserEditor;

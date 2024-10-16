import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import { User } from '../../types/types';
import { editUser } from '../../features/usersSlice';
import s from '../UserEditor/UserEditor.module.scss';

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
        <div className={s.UserEditorWrapper}>
            <div className={s.UserEditorHeader}>
                <h2 className={s.UserEditorTitle}>Профиль пользователя</h2>
                <Button 
                    onClick={() => setIsEditing(true)} 
                    title={'Редактировать'}
                    className={s.EditButton}
                    disabled={isEditing} 
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.InputsWrapper}>
                    <div className={s.InputGroup}>
                        <label className={s.Label}>Name:</label>
                        <input 
                            type='text' 
                            {...register('name', { required: true })} 
                            className={`${s.InputField} ${errors.name ? s.Error : ''}`} 
                            disabled={!isEditing} 
                        />
                    </div>
                    <div className={s.InputGroup}>
                        <label className={s.Label}>User Name:</label>
                        <input 
                            type='text' 
                            {...register('username', { required: true })} 
                            className={`${s.InputField} ${errors.username ? s.Error : ''}`}
                            disabled={!isEditing} 
                        />
                    </div>
                    <div className={s.InputGroup}>
                        <label className={s.Label}>Email:</label>
                        <input 
                            type='email' 
                            {...register('email', { required: true })} 
                            className={`${s.InputField} ${errors.email ? s.Error : ''}`} 
                            disabled={!isEditing} 
                        />
                    </div>
                    <div className={s.InputGroup}>
                        <label className={s.Label}>Street:</label>
                        <input 
                            type='text' 
                            {...register('address.street', { required: true })} 
                            className={`${s.InputField} ${errors.address?.street ? s.Error : ''}`} 
                            disabled={!isEditing} 
                        />
                    </div>
                    <div className={s.InputGroup}>
                        <label className={s.Label}>City:</label>
                        <input 
                            type='text' 
                            {...register('address.city', { required: true })} 
                            className={`${s.InputField} ${errors.address?.city ? s.Error : ''}`}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className={s.InputGroup}>
                        <label className={s.Label}>Zip Code:</label>
                        <input 
                            type='text' 
                            {...register('address.zipcode', { required: true })} 
                            className={`${s.InputField} ${errors.address?.zipcode ? s.Error : ''}`}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className={s.InputGroup}>
                        <label className={s.Label}>Phone:</label>
                        <input 
                            type='text' 
                            {...register('phone', { required: true })} 
                            className={`${s.InputField} ${errors.phone ? s.Error : ''}`}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className={s.InputGroup}>
                        <label className={s.Label}>Website:</label>
                        <input 
                            type='text' 
                            {...register('website', { required: true })}  
                            className={`${s.InputField} ${errors.website ? s.Error : ''}`}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className={s.InputGroup}>
                        <label className={s.Label}>Comment:</label>
                        <textarea 
                            {...register('comment')}
                            className={s.CommentTextarea}
                            disabled={!isEditing}
                        />
                    </div>
                </div>
                <Button
                    title='Отправить'
                    className={!isEditing ? `${s.Disabled}` : `${s.SaveButton}`}
                    disabled={!isEditing} 
                />
            </form>
        </div>
    );
}

export default UserEditor;

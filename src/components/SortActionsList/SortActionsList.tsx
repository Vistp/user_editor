import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import s from './SortActionsList.module.scss'
import { sortUsers } from '../../features/usersSlice';
import { RootState } from '../../store/store';

const SortActionsList: React.FC = () => {
    const dispatch = useDispatch();
    const sortedBy = useSelector((state: RootState) => state.users.sortedBy);
    const handleSort = (sortBy: 'city' | 'company') => {
        dispatch(sortUsers(sortBy));
    }
    return (
        <div className={s.SortActionsList}>
            <h2 className={s.SortActionsTitle}>Сортировка</h2>
            <Button onClick={() => handleSort('city')} title={'по городу'} className={`${s.SortAction} ${sortedBy === 'city' ? s.active : ''}`}/>
            <Button onClick={() => handleSort('company')} title={'по компании'} className={`${s.SortAction} ${sortedBy === 'company' ? s.active : ''}`}/>
        </div>
    )
}

export default SortActionsList;
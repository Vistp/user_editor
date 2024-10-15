import Button from '../Button/Button';
import s from './SortActionsList.module.scss'

const SortActionsList: React.FC = () => {
    const handleSort = () => {
        console.log('Любая кнопка');
    }
    return (
        <div className={s.SortActionsList}>
            <h2 className={s.SortActionsTitle}>Сортировка</h2>
            <Button onClick={handleSort} title={'по городу'} className={s.SortAction}/>
            <Button onClick={handleSort} title={'по компании'} className={s.SortAction}/>
        </div>
    )
}

export default SortActionsList;
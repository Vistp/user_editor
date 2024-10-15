import { WrapperProps } from '../../types/types';
import s from './Container.module.scss';

const Container: React.FC<WrapperProps> = ({ children }) => {
    return (
        <div className={s.Container}>
            {children}
        </div>
    )
}

export default Container;
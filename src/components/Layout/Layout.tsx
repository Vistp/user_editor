import { WrapperProps } from '../../types/types';
import Container from '../Container/Container';
import SortActionsList from '../SortActionsList/SortActionsList';

const Layout: React.FC<WrapperProps> = ({ children }) => {
    return (
        <Container>
            <SortActionsList />
            {children}
        </Container>
    )
}

export default Layout;
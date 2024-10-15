import Layout from '../components/Layout/Layout';
import UsersList from '../components/UsersList/UsersList';

const MainPage: React.FC = () => {
    return (
        <Layout>
            <UsersList />
        </Layout> 
    )
}

export default MainPage;
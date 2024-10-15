import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import UserEditor from '../components/UserEditor/UserEditor';

const UserProfilePage: React.FC = () => {
    const { id } = useParams();
    return (
        <Layout>
            <UserEditor id={id}/>
        </Layout>
    )
}

export default UserProfilePage;
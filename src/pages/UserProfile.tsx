import { useParams } from "react-router-dom";
import Container from "../components/Container/Container"
import SortActionsList from "../components/SortActionsList/SortActionsList"
import UserEditor from "../components/UserEditor/UserEditor";

const UserProfilePage: React.FC = () => {
    const { id } = useParams();
    return (
        <>
            <Container>
                <SortActionsList/>
                <UserEditor id={id}/>
            </Container>
        </>
    )
}

export default UserProfilePage;
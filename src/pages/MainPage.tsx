import Container from "../components/Container/Container";
import SortActionsList from "../components/SortActionsList/SortActionsList";
import UsersList from "../components/UsersList/UsersList";

const MainPage: React.FC = () => {
    return (
        <>
            <Container>
                <SortActionsList />
                <UsersList />
            </Container> 
        </>
    )
}

export default MainPage;
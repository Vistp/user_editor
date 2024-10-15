import Container from "../components/Container/Container"
import SortActionsList from "../components/SortActionsList/SortActionsList"

const UserProfilePage: React.FC = () => {
    return (
        <>
            <Container>
                <SortActionsList/>
                <h2>Профиль пользователя</h2>
            </Container>
        </>
    )
}

export default UserProfilePage;
import { User } from "../types/types";

const UserItem: React.FC<User> = ({ name, address, company }) => {
    return (
        <>
            <p>ФИО: {name}</p>
            <p>город: {address.city}</p>
            <p>компания: {company.name}</p>
        </>
    )
}

export default UserItem;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/types';

interface UsersState {
    users: User[];
    sortedBy: 'city' | 'company' | null;
}

const initialState: UsersState = {
    users: [],
    sortedBy: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload;
        },
        sortUsers(state, action: PayloadAction<'city' | 'company'>) {
            state.sortedBy = action.payload;
            state.users.sort((a, b) => {
                const aValue = action.payload === 'city' ? a.address.city : a.company.name;
                const bValue = action.payload === 'city' ? b.address.city : b.company.name;

                return aValue.localeCompare(bValue);
            });
        },
    },
});

export const { setUsers, sortUsers } = usersSlice.actions;
export default usersSlice.reducer;
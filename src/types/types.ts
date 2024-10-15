export interface User {
    id: number;
    name: string;
    address: {
        city: string;
    };
    company: {
        name: string;
    };
}
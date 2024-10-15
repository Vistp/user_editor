export interface ContainerProps {
    children: React.ReactNode;
}

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
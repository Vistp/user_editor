import s from './Button.module.scss';

interface ButtonProps {
    onClick: () => void;
    title: string;
    className?: string;
}
const Button: React.FC<ButtonProps> = ({ onClick, title, className }) => {
    return (
        <button className={`${s.Button} ${className}`} onClick={onClick}>
            {title}
        </button>
    )
}

export default Button;
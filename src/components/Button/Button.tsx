import s from './Button.module.scss';

interface ButtonProps {
    onClick?: () => void;
    title: string;
    className?: string;
    disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({ onClick, title, className, disabled }) => {
    return (
        <button 
            className={`${s.Button} ${className}`} 
            onClick={onClick}
            disabled={disabled}
        >
            {title}
        </button>
    )
}

export default Button;
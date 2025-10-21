type SizeType = 'small' | 'medium' | 'large';

interface LoadingProps {
    size?: SizeType;
    text?: string;
    className?: string;
}

export const Loading = ({ size = 'large', text = 'Загрузка...', className = '' }: LoadingProps) => {
    const sizeClasses: Record<SizeType, string> = {
        small: 'h-4 w-4',
        medium: 'h-6 w-6',
        large: 'h-8 w-8',
    };

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <div className={`animate-spin rounded-full border-b-2 border-green-600 ${sizeClasses[size]}`}></div>
            {text && <p className="mt-2 text-gray-600 font-medium">{text}</p>}
        </div>
    );
};
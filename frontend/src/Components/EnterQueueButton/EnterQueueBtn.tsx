import type { FC } from "react";


interface ComponentsProps {
    isDisabled: boolean;
    handleMainBtnClick: () => void;
    message: string;
    className?: string;
}


export const EnterQueueBtn: FC<ComponentsProps> = ({isDisabled, className, handleMainBtnClick, message}) => {


    return (
        
            <button 
            className={className}
             onClick={() => handleMainBtnClick}
                disabled={ isDisabled }
             >
              {message}
            </button>
    )
}
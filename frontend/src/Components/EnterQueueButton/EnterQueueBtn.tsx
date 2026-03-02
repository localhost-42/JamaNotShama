import type { FC } from "react";


interface ComponentsProps {
    isDisabled: boolean;
    userName: string;
    handleMainBtnClick: (userName: string) => void;
    message: string;
    className?: string;
}


export const EnterQueueBtn: FC<ComponentsProps> = ({isDisabled, className, userName, handleMainBtnClick, message}) => {


    return (
        
            <button 
            className={className}
             onClick={() => handleMainBtnClick(userName)}
                disabled={ isDisabled }
             >
              {message}
            </button>
    )
}
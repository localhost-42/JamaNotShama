import type { FC } from "react";

interface ComponentProps {
    people: string[];
    className?: string;
}


export const PeopleList: FC<ComponentProps> = ({ people, className }) => {
    return (
        <ul className={`list-group ${className || ''} overflow-auto`}>
           {(
                people.map((person, index) => (
                    <li key={index} style={{minHeight: '50px'}} 
                    className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{`${index + 1}. `}</span>
                        <span>{person}</span>
                    </li>
                ))
            )}
        </ul>
    );
}
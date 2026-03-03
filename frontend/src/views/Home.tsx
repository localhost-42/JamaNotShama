import type { FC } from "react";
import { Exit } from "../Components/Exit/Exit";
import { Statistics } from "../Components/Statistics/Statistics";

export const Home: FC = () => {
    return (
        <div>
            <Statistics />
            <Exit />
        </div>
    );
};
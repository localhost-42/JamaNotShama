import type { FC } from "react";
import { Exit } from "../Components/Exit";
import { Statistics } from "../Components/Statistics";

export const Home: FC = () => {
  return (
    <div>
      <Statistics />
      <Exit />
    </div>
  );
};

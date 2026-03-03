import type { FC } from "react";
import { Exit } from "../components/Exit/Exit";
import { Statistics } from "../components/Statistics/Statistics";

export const Home: FC = () => {
  return (
    <div>
      <Statistics />
      <Exit />
    </div>
  );
};

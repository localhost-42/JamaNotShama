import type { FC } from "react";
import { Exit } from "../components/Exit";
import { Statistics } from "../components/Statistics";

export const Home: FC = () => {
  return (
    <div>
      <Statistics />
      <Exit />
    </div>
  );
};

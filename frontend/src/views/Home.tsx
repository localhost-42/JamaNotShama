import type { FC } from "react";
import { Exit } from "../components/Exit";
import { Statistics } from "../components/Statistics";

export const Home: FC = () => {
  return (
 
    <div className="d-flex mb-3 justify-content-between">
      <div className="column">
      <Statistics />            
      </div>
      <div className="column">
      <Exit />
      </div>
    </div>
 
  );
};

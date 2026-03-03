import type { FC } from "react";
import { Exit } from "../components/Exit";
import { Statistics } from "../components/Statistics";

export const Home: FC = () => {
  return (
 
    <div className="d-flex mb-3 m-5 justify-content-between">
      <div className="column m-5">
      <Statistics />            
      </div>
      <div className="column">
      <Exit />
      </div>
    </div>
 
  );
};

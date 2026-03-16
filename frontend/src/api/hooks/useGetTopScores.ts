import { useEffect, useState } from "react";
import api from "..";
// import { socket } from "../socket";
import type { ScoreRow } from "../../utils/types";


export const useGetTopScores = () => {
    const [topScores, setTopScores] = useState<ScoreRow[]>([]);

      useEffect(() => {

        const fetchTopScores = async  () => {
          api.scores().getTopScores()
          .then((response) => 
            setTopScores( response.data ? response.data  : []))
          .catch((error) => {
            alert("Error fetching to scores " + error.message);
          }); 
          
        }


        fetchTopScores()
      },[])



 return { topScores }
}
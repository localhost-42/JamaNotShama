import { useEffect, useState } from "react";
import api from "..";
import { socket } from "../socket";
import type { ScoreRow } from "../../utils/types";


export const useGetTopScores = () => {
    const [topScores, setTopScores] = useState<ScoreRow[]>([]);

  
        const fetchTopScores = async () => {
                await api.scores().getTopScores()
                .then((response) => 
                    setTopScores( response.data ? response.data  : []))
                .catch((error) => {
                    alert("Error fetching to scores " + error.message);
      }); 

    }

  useEffect(() => {
    fetchTopScores();

    const handleScoreChange = () => {
      fetchTopScores();
    };

    socket.on("scoreUpdated", handleScoreChange);

    return () => {
      socket.off("scoreUpdated", handleScoreChange);
    };
  }, []);


 return { topScores }
}
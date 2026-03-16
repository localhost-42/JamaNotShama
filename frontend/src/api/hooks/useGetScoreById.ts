import api from "..";



export const useGetTopScoresById = (id: number) => {
        const fetchTopScore = async () => {
            try {
              return (await api.scores().getTopScoreById(id)).data
         
              } catch (err) {

                alert("Error updating top score: " + (err instanceof Error ? err.message : String(err)));
            }
         }

     return { fetchTopScore }
}



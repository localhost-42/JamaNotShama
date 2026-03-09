import api from ".."




export const useUpdateTopScore = () => {
const updateTopScore = async (score: number, id: number) => {
    try {
      const response = await api.scores().updateTopScore(id, score);

        return response.data;
    } catch (err) {

        alert("Error updating top score: " + (err instanceof Error ? err.message : String(err)));
    }
};

return { updateTopScore };

}
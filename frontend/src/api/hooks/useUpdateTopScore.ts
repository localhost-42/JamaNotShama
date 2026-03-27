import api from ".."




export const useUpdateTopScore = ( id: number) => {
const updateTopScore = async (score: number) => {
    try {
    await api.scores().updateTopScore(id, score);

    } catch (err) {

        alert("Error updating top score: " + (err instanceof Error ? err.message : String(err)));
    }
};

return { updateTopScore };

}
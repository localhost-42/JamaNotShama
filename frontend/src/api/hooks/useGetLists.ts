import { useEffect, useState } from "react";
import api from "..";




export const useGetLists = () => {
 const [waitingQueue, setWaitingQueue] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      api
        .list()
        .getAll()
        .then((response) => {
          setWaitingQueue(Array.isArray(response.data) ? response.data : []);
        })
        .catch((error) => {
          alert("Error fetching waiting list:" + error.message);
        });
    };

    fetchData();
  }, [waitingQueue]);

  return {waitingQueue, setWaitingQueue};
}
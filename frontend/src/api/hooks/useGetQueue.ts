

import { useEffect, useState } from "react";
import api from "..";





export const useGetQueue = () => {
 const [waitingQueue, setWaitingQueue] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      api
        .queue()
        .getAll()
        .then((response) => {
          setWaitingQueue(response.data ? response.data.map(({name}) => name) : []);
        })
        .catch((error) => {
          alert("Error fetching waiting queue: " + error.message);
        });
    };

    fetchData();
  }, []);

  return {waitingQueue, setWaitingQueue};
}
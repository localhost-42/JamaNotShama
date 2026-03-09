import { useEffect, useState } from "react";
import api from "..";
import { socket } from "../socket";

export const useGetQueue = () => {
  const [waitingQueue, setWaitingQueue] = useState<string[]>([]);
  
    const formatTime = (date: Date): string =>
    `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;


  const fetchQueue = async () => {
    api
      .queue()
      .getAll()
      .then((response) => {
        setWaitingQueue(
          response.data ? response.data.map(({ name, enterTime}) => `${name} ${formatTime(enterTime)}`) : [],
        );
      })
      .catch((error) => {
        alert("Error fetching waiting queue: " + error.message);
      });
  };

  useEffect(() => {
    fetchQueue();

    const handleQueueUpdated = () => {
      fetchQueue();
    };

    socket.on("queueUpdated", handleQueueUpdated);

    return () => {
      socket.off("queueUpdated", handleQueueUpdated);
    };
  }, []);

  return { waitingQueue, setWaitingQueue };
};

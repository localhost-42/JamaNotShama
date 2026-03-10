import { useEffect, useState } from "react";
import api from "..";
import { socket } from "../socket";

export const useGetLists = () => {
  const [peopleOutside, setPeopleOutside] = useState<string[]>([]);

  const formatTime = (dateValue: string | Date): string => {
    const date = new Date(dateValue);

    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const fetchList = async () => {
    api
      .list()
      .getAll()
      .then((response) => {
        setPeopleOutside(
          response.data.length
            ? response.data.map(
                ({ name, enterTime }) => `${name}  ${formatTime(enterTime)}`,
              )
            : [],
        );
      })
      .catch((error) => {
        alert("Error fetching list:" + error.message);
      });
  };

  useEffect(() => {
    fetchList();

    const handleListUpdated = () => {
      fetchList();
    };

    socket.on("listUpdated", handleListUpdated);

    return () => {
      socket.off("listUpdated", handleListUpdated);
    };
  }, []);

  return { peopleOutside, setPeopleOutside };
};

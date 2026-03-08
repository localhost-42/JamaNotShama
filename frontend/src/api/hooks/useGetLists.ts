import { useEffect, useState } from "react";
import api from "..";
import { socket } from "../socket";

export const useGetLists = () => {
  const [peopleOutside, setPeopleOutside] = useState<string[]>([]);

  const fetchList = async () => {
    api
      .list()
      .getAll()
      .then((response) => {
        setPeopleOutside(
          response.data ? response.data.map(({ name }) => name) : [],
        );
      })
      .catch((error) => {
        alert("Error fetching queue:" + error.message);
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

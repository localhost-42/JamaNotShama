import { useEffect, useState } from "react";
import api from "..";
import { socket } from "../socket";
import type { nameTimeRow } from "../../utils/types";

export const useGetLists = () => {
  const [peopleOutside, setPeopleOutside] = useState<nameTimeRow[]>([]);

  const fetchList = async () => {
    api
      .list()
      .getAll()
      .then((response) => {
        setPeopleOutside(response.data ?? []);
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

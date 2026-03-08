import { useEffect, useState } from "react";
import api from "..";

export const useGetLists = () => {
const [peopleOutside, setPeopleOutside] = useState<string[]>([]);


useEffect(() => {
  const fetchData = async () => {
    api
      .list()
      .getAll()
      .then((response) => {
        setPeopleOutside(response.data ? response.data.map(({name}) => name) : [] );
      })
      .catch((error) => {
        alert("Error fetching queue:" + error.message);
      });
  };

  fetchData();
}, []);

return {peopleOutside, setPeopleOutside};
}
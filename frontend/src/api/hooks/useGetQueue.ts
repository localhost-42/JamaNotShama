import { useEffect, useState } from "react";
import api from "..";


export const useGetQueue = () => {
const [peopleOutside, setPeopleOutside] = useState<string[]>([]);


useEffect(() => {
  const fetchData = async () => {
    api
      .queue()
      .getAll()
      .then((response) => {
        setPeopleOutside(response.data ? [] : response.data );
      })
      .catch((error) => {
        alert("Error fetching queue:" + error.message);
      });
  };

  fetchData();
}, [peopleOutside]);

return {peopleOutside, setPeopleOutside};
}
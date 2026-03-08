import { useEffect, useState } from "react";
import api from "..";
import type { LogRow } from "../../utils/types";
import { useGetLists } from "./useGetLists";


export const useGetLogs = () => {
  const [logs, setLogs] = useState<LogRow[]>([]);
  const {peopleOutside} = useGetLists();

 
     useEffect(() => {
         const fetchLogs = async () => {
             api.logs().getAll().then((logs) => {
                 setLogs(Array.isArray(logs.data) ? logs.data : []);
             }).catch((error: Error) => {
                 alert("Error fetching logs:" + error.message);
             });
         }
 
         fetchLogs();
 
     }, [peopleOutside]);
 
    return { logs, setLogs };
}
import { useEffect, useState } from "react";
import api from "..";
import type { LogRow } from "../../utils/types";




export const useGetLogs = (peopleOutside: string[]) => {
  const [logs, setLogs] = useState<LogRow[]>([]);


 
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
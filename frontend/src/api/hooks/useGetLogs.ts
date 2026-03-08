import { useEffect, useState } from "react";
import api from "..";
import type { LogRow } from "../../utils/types";




export const useGetLogs = (peopleOutside: string[]) => {
  const [logs, setLogs] = useState<LogRow[]>([]);


 
     useEffect(() => {
         const fetchLogs = async () => {
             api.logs().getAll().then((logs) => {
                console.log(logs.data);
                    
                
                 setLogs(logs.data.length !== 0 ? logs.data : []);
             }).catch((error: Error) => {
                 alert("Error fetching logs:" + error.message);
             });
         }
 

         
         fetchLogs();
        }, [peopleOutside]);
 
    return { logs, setLogs };
}
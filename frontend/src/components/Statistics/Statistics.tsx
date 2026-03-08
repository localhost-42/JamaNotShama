import { useState, type FC } from "react";
import { useGetLists, useGetLogs } from "../../api/hooks";
import type { LogRow } from "../../utils/types";


export const Statistics: FC = () => {
    const {peopleOutside} = useGetLists();
    const {logs} = useGetLogs(peopleOutside);
    const [openDay, setOpenDay] = useState<LogRow['exit_time' | 'enter_time'] | null>(null);
    const distinctDates = [
  ...new Set(logs.map(log => new Date(log.date).toISOString().split("T")[0]))
];


 



   
    return (
        <div className="container mt-3">
            <h1 className="mb-3">Statistics</h1>
            {logs.length === 0 && (
                <div className="alert alert-secondary">No logs available</div>
            )}

            {distinctDates.map((date) => (
                <div key={date.toLocaleString()} className="mb-3">
                    <button
                    style={{minWidth: '40vh'}}
                        className="btn btn-light w-100 text-start"
                       onClick={() => setOpenDay(openDay === date ? null : date)}
                    >
                        {date.toLocaleString()} 
                    </button>
                  { openDay === date &&
                        <div className="d-flex justify-content-center">
                            <ul className="list-group container bg-light p-3" >
                        { logs
                            .filter((l) => l.date === date)
                            .map((log) => (
                                
                                <li className="list-item d-flex m-1 justify-content-between">
                                    <span>{log.name}</span>
                                    <span>
                                    {log.enter_time} - {log.exit_time}
                                    </span>
                                </li>
                                ))
                                }   
                    </ul>
                </div>

            }
            </div>
            ))}
        </div>
    );
}
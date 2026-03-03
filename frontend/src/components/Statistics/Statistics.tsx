import { useState, type FC } from "react";

import type { LogRow } from "../../utils/types";
import { useGetLogs } from "../../api/hooks";


export const Statistics: FC = () => {
    const {logs} = useGetLogs();
    const [openDay, setOpenDay] = useState<string | null>(null);

    

    const formatDate = (date: Date | string) => {
        const d = new Date(date);
        return d.toLocaleDateString();
    };

    // group logs by day
    const logsByDay: { [date: string]: LogRow[] } = {};
    logs.forEach((log) => {
        const day = formatDate(log.enterTime);
        if (!logsByDay[day]) logsByDay[day] = [];
        logsByDay[day].push(log);
    });

    return (
        <div className="container mt-3">
            <h1 className="mb-3">Statistics</h1>
            {Object.keys(logsByDay).length === 0 && (
                <div className="alert alert-secondary">No logs available</div>
            )}

            {Object.entries(logsByDay).map(([day, dayLogs]) => (
                <div key={day} className="mb-3">
                    <button
                        className="btn btn-outline-primary w-100 text-start"
                        onClick={() => setOpenDay(openDay === day ? null : day)}
                    >
                        {day} <span className="badge bg-primary ms-2">{dayLogs.length}</span>
                    </button>
                    {openDay === day && (
                        <div className="card card-body mt-2">
                            <ul className="list-group">
                                {dayLogs.map((log) => (
                                    <li key={log.id} className="list-group-item d-flex justify-content-between">
                                        <span>User {log.userId}</span>
                                        <span>
                                            {new Date(log.enterTime).toLocaleTimeString()} -{' '}
                                            {log.exitTime
                                                ? new Date(log.exitTime).toLocaleTimeString()
                                                : 'N/A'}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
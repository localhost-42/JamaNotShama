import { useState, type FC } from "react";
import { useGetLists, useGetLogs } from "../../api/hooks";
import type { LogRow } from "../../utils/types";

export const Statistics: FC = () => {
  const { peopleOutside } = useGetLists();
  const { logs } = useGetLogs(peopleOutside.map((person) => person.name));

  const [openDay, setOpenDay] = useState<string | null>(null);

  const formatTime = (date: string | Date) =>
    new Date(date).toLocaleTimeString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
    });

  // Group logs by day
  const logsByDate = logs.reduce<Record<string, LogRow[]>>((acc, log) => {
    const day = new Date(log.date).toISOString().split("T")[0];

    if (!acc[day]) {
      acc[day] = [];
    }

    acc[day].push(log);

    return acc;
  }, {});

  // Sort logs inside each day
  Object.keys(logsByDate).forEach((day) => {
    logsByDate[day].sort(
      (b, a) =>
        new Date(a.enter_time).getTime() - new Date(b.enter_time).getTime(),
    );
  });

  const distinctDates = Object.keys(logsByDate).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  return (
    <div className="container mt-3">
      <h1 className="mb-3">Statistics</h1>

      {logs.length === 0 && (
        <div className="alert alert-secondary">No logs available</div>
      )}

      {distinctDates.map((date) => (
        <div key={date} className="mb-3">
          <button
            className="btn btn-light w-100 text-start d-flex justify-content-between align-items-center"
            onClick={() => setOpenDay(openDay === date ? null : date)}
          >
            <span>{date}</span>
            <span className="badge bg-secondary">
              {logsByDate[date].length}
            </span>
          </button>

          {openDay === date && (
            <ul className="list-group mt-2">
              {logsByDate[date].map((log) => (
                <li
                  key={`${log.name}-${log.enter_time}-${log.exit_time}`}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>{log.name}</span>
                  <span>
                    {formatTime(log.enter_time)} -{" "}
                    {log.exit_time ? formatTime(log.exit_time) : "N/A"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

import type { FC } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import heLocale from "@fullcalendar/core/locales/he";

export const SchedulePage: FC = () => {
  // ------------------------
  // כל האירועים נשמרים במשתנה למעלה
  // ------------------------
  const baseEvents = [
    {
      title: "חווד",
      start: "2026-03-08T09:00:00",
      end: "2026-03-08T12:00:00",
      backgroundColor: "#076d99",
      borderColor: "#076d99",
      textColor: "#fff",
    },
    {
      title: "סקד / אתגרים",
      start: "2026-03-08T13:00:00",
      end: "2026-03-08T18:00:00",
      backgroundColor: "#8f8b17",
      borderColor: "#8f8b17",
      textColor: "#fff",
    },
    {
      title: "פנלים",
      start: "2026-03-08T18:00:00",
      end: "2026-03-08T19:00:00",
      backgroundColor: "#323002",
      borderColor: "#323002",
      textColor: "#fff",
    },
    {
      title: "פרוייקט",
      start: "2026-03-09T09:00:00",
      end: "2026-03-09T12:00:00",
      backgroundColor: "#4b074d",
      borderColor: "#4b074d",
      textColor: "#fff",
    },
    {
      title: "פרוייקט",
      start: "2026-03-09T13:00:00",
      end: "2026-03-09T19:00:00",
      backgroundColor: "#4b074d",
      borderColor: "#4b074d",
      textColor: "#fff",
    },
    {
      title: "פרוייקט",
      start: "2026-03-10T09:00:00",
      end: "2026-03-10T12:00:00",
      backgroundColor: "#4b074d",
      borderColor: "#4b074d",
      textColor: "#fff",
    },
    {
      title: "פאנלים",
      start: "2026-03-10T13:00:00",
      end: "2026-03-10T16:00:00",
      backgroundColor: "#352904",
      borderColor: "#352904",
      textColor: "#fff",
    },
    {
      title: "פרוייקט",
      start: "2026-03-10T16:00:00",
      end: "2026-03-10T19:00:00",
      backgroundColor: "#4b074d",
      borderColor: "#4b074d",
      textColor: "#fff",
    },
    {
      title: "פרוייקט",
      start: "2026-03-11T09:00:00",
      end: "2026-03-11T12:00:00",
      backgroundColor: "#4b074d",
      borderColor: "#4b074d",
      textColor: "#fff",
    },
    {
      title: "פרוייקט",
      start: "2026-03-11T13:00:00",
      end: "2026-03-11T19:00:00",
      backgroundColor: "#4b074d",
      borderColor: "#4b074d",
      textColor: "#fff",
    },
    {
      title: "פרוייקט",
      start: "2026-03-12T09:00:00",
      end: "2026-03-12T12:00:00",
      backgroundColor: "#4b074d",
      borderColor: "#4b074d",
      textColor: "#fff",
    },
    {
      title: "פרוייקט",
      start: "2026-03-12T13:00:00",
      end: "2026-03-12T19:00:00",
      backgroundColor: "#4b074d",
      borderColor: "#4b074d",
      textColor: "#fff",
    },
  ];

  const days = ["2026-03-08", "2026-03-09", "2026-03-10", "2026-03-11", "2026-03-12"];
  days.forEach((day) => {
    baseEvents.push({
      title: "הפסקת צהריים",
      start: `${day}T12:00:00`,
      end: `${day}T13:00:00`,
      backgroundColor: "#d9d9d9",
      borderColor: "#b0b0b0",
      textColor: "#333",
    });
  });

  const events = [...baseEvents];

  
  return (
    <div className="container mt-5">
      <h1
        className="text-center mb-4"
        style={{ fontFamily: "Arial, sans-serif", fontWeight: 700 }}
      >
         מערכת שעות
      </h1>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        }}
      >
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          locales={[heLocale]}
          locale="he"
          firstDay={0}
          hiddenDays={[5, 6]} // מסתיר שישי ושבת
          allDaySlot={false}
          slotMinTime="09:00:00"
          slotMaxTime="19:00:00"
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          slotDuration="00:30:00"
          height="auto"
          headerToolbar={false}
          events={events}
          eventDisplay="block"
          eventMinHeight={50}
          dayHeaderContent={(arg) => (
            <div
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                color: "#333",
                textAlign: "center",
              }}
            >
              {arg.text}
            </div>
          )}
          slotLabelContent={(arg) => (
            <div
              style={{
                fontWeight: 600,
                color: "#555",
                fontSize: "0.85rem",
              }}
            >
              {arg.text}
            </div>
          )}
          dayMaxEventRows={true} // מרווח בין אירועים
        />
      </div>
    </div>
  );
};
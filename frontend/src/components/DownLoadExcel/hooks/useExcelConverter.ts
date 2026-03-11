import ExcelJS from "exceljs";
import { useEffect, useState } from "react";
import api from "../../../api";
import { saveAs } from "file-saver";
import type { LogRow } from "../../../utils/types";

export const useExcelConverter = () => {
  const [excelInfo, setExcelInfo] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const makeExcel = async () => {
      try {
        const res = await api.logs().getAll();
        const uncheckedRes: LogRow[] = res.data ?? [];

        const result: LogRow[] =
          uncheckedRes.length === 0
            ? [
                {
                  name: "",
                  exit_time: "",
                  enter_time: "",
                  date: "",
                },
              ]
            : uncheckedRes;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Report");

        worksheet.columns = [
          { header: "שם", key: "name", width: 25 },
          { header: "תאריך", key: "date", width: 20 },
          { header: "זמן יציאה", key: "enter_time", width: 20 },
          { header: "זמן חזרה", key: "exit_time", width: 20 },
        ];

        const formatIsraelTime = (value: string | Date) =>
          new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Jerusalem",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(new Date(value));

        const formatIsraelDate = (value: string | Date) =>
          new Intl.DateTimeFormat("en-CA", {
            timeZone: "Asia/Jerusalem",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(new Date(value));

        const formattedRows = result.map((row) => ({
          name: row.name,
          date: row.date ? formatIsraelDate(row.date) : "",
          enter_time: row.enter_time ? formatIsraelTime(row.enter_time) : "",
          exit_time: row.exit_time ? formatIsraelTime(row.exit_time) : "",
        }));

        worksheet.addRows(formattedRows);

        worksheet.getRow(1).eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFC0C0C0" },
          };
          cell.font = { bold: true };
        });

        const buffer = await workbook.xlsx.writeBuffer();

        setExcelInfo(
          new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          }),
        );
      } catch (error) {
        console.error("Excel generation failed:", error);
      }
    };

    makeExcel();
  }, []);

  const downloadExcel = async () => {
    if (!excelInfo) return;

    try {
      setLoading(true);
      saveAs(excelInfo, "report.xlsx");
    } catch (error) {
      console.error("Error downloading Excel:", error);
    } finally {
      setLoading(false);
    }
  };

  return { downloadExcel, loading };
};

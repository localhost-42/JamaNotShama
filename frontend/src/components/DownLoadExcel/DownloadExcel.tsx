import { useState, type FC } from "react";
import api from "../../api";
import { saveAs } from "file-saver";




export const DownloadExcel: FC = () => {
const [loading, setLoading] = useState(false);

const downloadExcel = async () => {
    try {
      setLoading(true);

      // Axios request for binary data
      const response = await api.excel().get()

      // Use FileSaver to trigger download
      saveAs(response.data, "report.xlsx");

    } catch (error) {
      console.error("Error downloading Excel:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={downloadExcel} disabled={loading}>
      {loading ? "Downloading..." : "Download Excel Report"}
    </button>
  );
}
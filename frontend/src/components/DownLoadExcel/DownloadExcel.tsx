import { type FC } from "react";

import { useExcelConverter } from "./hooks/useExcelConverter";


export const DownloadExcel: FC = () => {
  const {downloadExcel, loading} = useExcelConverter()

  return (
    <button className="btn d-flex gap-2 btn-outline-dark btn-danger btn-lg"  onClick={downloadExcel} disabled={loading}>
         <div>
         { loading ? "Downloading..." : "Download Excel Report"}     
        </div>
  
      <i className="bi bi-download"></i> 
    </button>
  );
}

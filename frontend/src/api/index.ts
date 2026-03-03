import axios, { type AxiosResponse } from "axios";
import type { ExcelReportRow, LogRow } from "../utils/types";
const axiosInstance = axios.create({
  baseURL: "/api",
});

export default {
  users() {
    return {
      postUser: (id: number, name: string): Promise<AxiosResponse<void>> =>
        axiosInstance.post(`/login`, { id, name }),
    };
  },
  queue() {
    return {
      enterQueue: (id: number): Promise<AxiosResponse<void>> =>
        axiosInstance.post(`/enter/${id}/queue`),
      exitQueue: (id: number): Promise<AxiosResponse<void>> =>
        axiosInstance.delete(`/exit/${id}/queue`),
      getAll: (): Promise<AxiosResponse<string[]>> =>
        axiosInstance.get(`/queue`),
    };
  },
  list() {
    return {
      enterList: (id: number, name: string): Promise<AxiosResponse<void>> =>
        axiosInstance.post(`/enter/${id}/list`, { name }),
      exitList: (id: number): Promise<AxiosResponse<void>> =>
        axiosInstance.put(`/exit/${id}/list`),
      getAll: (): Promise<AxiosResponse<string[]>> =>
        axiosInstance.get(`/list`),
    };
  },
  logs() {
    return {
      getAll: (): Promise<AxiosResponse<LogRow[]>> =>
        axiosInstance.get(`/logs`),
    };
  },
  excel() {
    return {
      get: (): Promise<AxiosResponse<ExcelReportRow[]>> =>
        axiosInstance.get("/excel"),
    };
  },
};

import axios, { type AxiosResponse } from "axios";
import type { LogRow } from "../utils/types";
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
        axiosInstance.post(`/queue/enter/${id}`),
      exitQueue: (id: number): Promise<AxiosResponse<void>> =>
        axiosInstance.delete(`/queue/exit/${id}`),
      getAll: (): Promise<AxiosResponse<string[]>> =>
        axiosInstance.get(`/queue`),
    };
  },
  list() {
    return {
      enterList: (id: number, name: string): Promise<AxiosResponse<void>> =>
        axiosInstance.post(`/list/enter/${id}`, { name }),
      exitList: (id: number): Promise<AxiosResponse<void>> =>
        axiosInstance.put(`/list/exit/${id}`),
      getAll: (): Promise<AxiosResponse<string[]>> =>
        axiosInstance.get(`/list`),
    };
  },
  logs() {
    return {
      getAll: (): Promise<AxiosResponse<LogRow[]>> =>
        axiosInstance.get(`/list/logs`),
    };
  }
};

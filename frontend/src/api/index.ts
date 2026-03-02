import axios, { type AxiosResponse } from "axios";
const axiosInstance = axios.create({
  baseURL: "151.145.88.80:3000/",
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
  }
};
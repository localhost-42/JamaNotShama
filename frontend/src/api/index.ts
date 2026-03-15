import axios, { type AxiosResponse } from "axios";
import type { LogRow, nameRow, nameTimeRow, ScoreRow } from "../utils/types";
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
        axiosInstance.post(`/queues/enter/${id}`),
      exitQueue: (id: number): Promise<AxiosResponse<void>> =>
        axiosInstance.delete(`/queues/exit/${id}`),
      getAll: (): Promise<AxiosResponse<nameRow[]>> =>
        axiosInstance.get(`/queues`),
    };
  },
  list() {
    return {
      enterList: (id: number, name: string): Promise<AxiosResponse<void>> =>
        axiosInstance.post(`/lists/enter/${id}`, { name }),
      exitList: (id: number): Promise<AxiosResponse<void>> =>
        axiosInstance.put(`/lists/exit/${id}`),
      getAll: (): Promise<AxiosResponse<nameTimeRow[]>> =>
        axiosInstance.get(`/lists`),
    };
  },
  logs() {
    return {
      getAll: (): Promise<AxiosResponse<LogRow[]>> =>
        axiosInstance.get(`/lists/logs`),
    };
  },
  scores() {
    return {
      updateTopScore: (
        id: number,
        score: number,
      ): Promise<AxiosResponse<void>> =>
        axiosInstance.put(`/scores/${id}`,null , {params:  {score} }),
        getTopScoreById: (
        id: number,
      ): Promise<AxiosResponse<ScoreRow>> =>
        axiosInstance.put(`/scores/${id}`),
      getTopScores: (): Promise<AxiosResponse<ScoreRow[]>> =>
        axiosInstance.get(`/scores`),
    };
  },
};

import axios, { type AxiosResponse } from "axios";
const axiosInstance = axios.create({
  baseURL: "151.145.88.80:3000/",
});

export default {
  users() {
    return {
      postUser: (id: number, name: string): Promise<AxiosResponse<void>> =>
        axiosInstance.post(`/func/login`, { id, name }),
    };
  }
};
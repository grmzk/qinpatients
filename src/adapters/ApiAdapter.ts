import axios, { AxiosInstance } from "axios";
import { NavigateFunction } from "react-router";

class ApiAdapter {
  private client: AxiosInstance;

  constructor(baseURL: string, token?: string, navigate?: NavigateFunction) {
    this.client = axios.create({
      baseURL: baseURL,
    });
    if (token) {
      this.client.defaults.headers.authorization = `Token ${token}`;
    }
    this.client.interceptors.response.use(
      (response) => {
        // Любой код состояния, находящийся в диапазоне 2xx, вызывает срабатывание этой функции
        // Здесь можете сделать что-нибудь с ответом
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          console.log("UNAUTHORIZED");
          if (navigate) {
            console.log("NAVIGATE");
            navigate("/login", { relative: "path" });
          }
        }
        // Любые коды состояния, выходящие за пределы диапазона 2xx, вызывают срабатывание этой функции
        // Здесь можете сделать что-то с ошибкой ответа
        return Promise.reject(error);
      }
    );
  }

  async get(url: string) {
    const response = await this.client.get(url);
    return response.data;
  }

  async post(url: string, data: {} | {}[]) {
    const response = await this.client.post(url, data);
    return response.data;
  }

  async put(url: string, data: {} | {}[]) {
    const response = await this.client.put(url, data);
    return response.data;
  }

  async delete(url: string) {
    const response = await this.client.delete(url);
    return response.data;
  }
}

export default ApiAdapter;

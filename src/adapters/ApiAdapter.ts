import axios, { AxiosInstance } from "axios";

class ApiAdapter {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL: baseURL,
    });
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

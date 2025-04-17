import axios from "axios";

class ApiAdapter {
  constructor(baseURL: string) {
    axios.defaults.baseURL = baseURL;
  }

  async get(url: string) {
    const response = await axios.get(url);
    return response.data;
  }

  async post(url: string, data: {} | {}[]) {
    const response = await axios.post(url, data);
    return response.data;
  }

  async put(url: string, data: {} | {}[]) {
    const response = await axios.put(url, data);
    return response.data;
  }

  async delete(url: string) {
    const response = await axios.delete(url);
    return response.data;
  }
}

export default ApiAdapter;

import ApiAdapter from "../adapters/ApiAdapter";
import { BASE_URL } from "../configs/constants";
import { DateISODate } from "../types/DateISOStrings";
import Departments from "../types/Departments";

export function getDataRepository(): DataRepository {
  return new DataRepository();
}

class DataRepository {
  private adapter: ApiAdapter = new ApiAdapter(BASE_URL);

  async getSummary(department: Departments, date: DateISODate) {
    return await this.adapter.get(`/get_summary?department=${department}&date=${date}`);
  }

  async login(username: string, password: string) {
    return await this.adapter.post("/auth/token/login/", { username, password });
  }

  async logout() {
    return await this.adapter.post("/auth/token/logout/", {});
  }
}

export default getDataRepository();

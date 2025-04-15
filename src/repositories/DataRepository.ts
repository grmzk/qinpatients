import { NavigateFunction } from "react-router";

import ApiAdapter from "../adapters/ApiAdapter";
import { BASE_URL } from "../configs/constants";
import { DateISODate } from "../types/DateISOStrings";
import Departments from "../types/Departments";

export function getDataRepository(token?: string): DataRepository {
  return new DataRepository(token);
}

export class DataRepository {
  private static instance: DataRepository | undefined;
  static navigate: NavigateFunction | undefined;
  private adapter: ApiAdapter = new ApiAdapter(BASE_URL);

  constructor(token?: string) {
    if (!DataRepository.navigate) {
      throw new Error(
        "DataRepository.navigate must be defined in first element of first Route component! Example:\n" +
          "  DataRepository.navigate = useNavigate();"
      );
    }
    if (!token && DataRepository.instance) {
      return DataRepository.instance;
    }
    this.adapter = new ApiAdapter(BASE_URL, token, DataRepository.navigate);
    DataRepository.instance = this;
  }

  async getSummary(department: Departments, date: DateISODate) {
    return await this.adapter.get(`/get_summary?department=${department}&date=${date}`);
  }

  async login(username: string, password: string) {
    return await this.adapter.post("/auth/token/login/", { username, password });
  }
}

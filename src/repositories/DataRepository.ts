import ApiAdapter from "../adapters/ApiAdapter";
import { DateISODate } from "../components/types/DateISOStrings";
import Departments from "../components/types/Departments";
import { BASE_URL } from "../configs/constants";

class DataRepository {
  private adapter: ApiAdapter = new ApiAdapter(BASE_URL);

  async getSummary(department: Departments, date: DateISODate) {
    return await this.adapter.get(`/get_summary?department=${department}&date=${date}`);
  }
}

export default DataRepository;

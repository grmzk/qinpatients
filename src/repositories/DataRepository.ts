import ApiAdapter from "../adapters/ApiAdapter";
import { BASE_URL } from "../configs/config";
import { DateISODate } from "../types/DateISOStrings";
import Departments from "../types/Departments";
import PatientHistoryResponse from "../types/PatientHistoryResponse";
import PatientInfoResponse from "../types/PatientInfoResponse";
import SummaryResponse from "../types/SummaryResponse";

export function getDataRepository(): DataRepository {
  return new DataRepository();
}

class DataRepository {
  private adapter: ApiAdapter = new ApiAdapter(BASE_URL);

  async logout() {
    return await this.adapter.post("/auth/token/logout/", {});
  }

  async login(username: string, password: string) {
    return await this.adapter.post("/auth/token/login/", { username, password });
  }

  async getSummary(department: Departments, date: DateISODate): Promise<SummaryResponse[]> {
    return await this.adapter.get(`/get_summary?department=${department}&date=${date}`);
  }

  async getPatientInfo(patientId: number): Promise<PatientInfoResponse> {
    return await this.adapter.get(`/get_patient?patient_id=${patientId}`);
  }

  async getPatientHistory(patientId: number): Promise<PatientHistoryResponse> {
    return await this.adapter.get(`/get_patient_history?patient_id=${patientId}`);
  }
}

export default getDataRepository();

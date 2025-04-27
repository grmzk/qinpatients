import ApiAdapter from "../adapters/ApiAdapter";
import { BASE_URL } from "../configs/config";
import Department from "../types/Department";
import { ISODate } from "../types/ISODateStrings";
import PatientHistoryResponse from "../types/PatientHistoryResponse";
import PatientInfoResponse from "../types/PatientInfoResponse";
import { SearchQuery } from "../types/SearchQuery";
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

  async getSummary(department: Department, date: ISODate): Promise<SummaryResponse[]> {
    return await this.adapter.get(`/get_summary?department=${department}&date=${date}`);
  }

  async getPatientInfo(patientId: number): Promise<PatientInfoResponse> {
    return await this.adapter.get(`/get_patient?patient_id=${patientId}`);
  }

  async getPatientHistory(patientId: number): Promise<PatientHistoryResponse> {
    return await this.adapter.get(`/get_patient_history?patient_id=${patientId}`);
  }

  async search({ family, name, surname, startDate, endDate, department }: SearchQuery): Promise<SummaryResponse[]> {
    return await this.adapter.get(
      `/search?family=${family}&name=${name}&surname=${surname}&start_date=${startDate}&end_date=${endDate}&department=${department}`
    );
  }
}

export default getDataRepository();

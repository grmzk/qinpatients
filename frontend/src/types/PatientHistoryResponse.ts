import CaseDiseaseResponse from "./CaseDiseaseResponse";
import PatientInfoResponse from "./PatientInfoResponse";

type PatientHistoryResponse = {
  patient: PatientInfoResponse;
  history: CaseDiseaseResponse[];
};

export default PatientHistoryResponse;

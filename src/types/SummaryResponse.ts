import CaseDiseaseResponse from "./CaseDiseaseResponse";
import PatientInfoResponse from "./PatientInfoResponse";

type SummaryResponse = {
  patient: PatientInfoResponse;
  case_disease: CaseDiseaseResponse;
};

export default SummaryResponse;

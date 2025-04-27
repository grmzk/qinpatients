import { ISODate } from "./ISODateStrings";

type PatientInfoResponse = {
  patient_id: number;
  full_name: string;
  birthday: ISODate;
  age: string;
  workplace: string;
  address: string;
  extra_info: string;
};

export default PatientInfoResponse;

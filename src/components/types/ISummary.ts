interface ISummary {
  patient: {
    patient_id: number;
    full_name: string;
    birthday: string;
    age: string;
    workplace: string;
    address: string;
    extra_info: string;
  };
  case_disease: {
    card_id: number;
    admission_date: string;
    admission_outcome_date: string;
    department: string;
    diagnosis: string;
    inpatient_id: number;
    doctor: string;
    result: string;
    is_reanimation: boolean;
    is_outcome: boolean;
    is_inpatient: boolean;
  };
}

export default ISummary;

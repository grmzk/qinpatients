type CaseDiseaseResponse = {
  card_id: number;
  admission_date: string;
  admission_outcome_date: string;
  department: string;
  diagnosis: string;
  inpatient_id: number;
  inpatient_department: string;
  doctor: string;
  result: string;
  is_reanimation: boolean;
  is_outcome: boolean;
  is_inpatient: boolean;
};

export default CaseDiseaseResponse;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { getDataRepository } from "../../repositories/DataRepository";
import PatientHistoryResponse from "../../types/PatientHistoryResponse";
import MainContentLayout from "../layouts/MainContentLayout";
import PatientHistory from "./PatientHistory";
import PatientInfo from "./PatientInfo";

function Patient() {
  const [response, setResponse] = useState<PatientHistoryResponse>();
  const [isLoading, setIsLoading] = useState(false);

  const { patientId } = useParams();
  const navigate = useNavigate();

  if (!patientId || !isFinite(Number(patientId))) {
    navigate("/notfound", { replace: true });
  }

  useEffect(() => {
    if (!patientId) {
      return;
    }
    setIsLoading(true);
    getDataRepository()
      .getPatientHistory(+patientId)
      .then((response) => {
        setResponse(response);
        setIsLoading(false);
      })
      .catch(console.warn);
  }, [patientId]);

  return (
    <MainContentLayout>
      <PatientInfo patientInfo={response?.patient} />
      <PatientHistory history={response?.history} isLoading={isLoading} />
    </MainContentLayout>
  );
}

export default Patient;

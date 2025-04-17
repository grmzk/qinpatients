import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { PATIENT_INFO_UPDATE_INTERVAL } from "../../configs/config";
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

  const getPatientHistory = useCallback(() => {
    if (!patientId) {
      setIsLoading(false);
      return;
    }
    getDataRepository()
      .getPatientHistory(+patientId)
      .then(setResponse)
      .catch(console.warn)
      .finally(() => setIsLoading(false));
  }, [patientId]);

  useEffect(() => {
    let intervalId = setTimeout(function call() {
      getPatientHistory();
      intervalId = setTimeout(call, PATIENT_INFO_UPDATE_INTERVAL);
    });
    setIsLoading(true);
    return () => clearInterval(intervalId);
  }, [patientId, getPatientHistory]);

  return (
    <MainContentLayout>
      <PatientInfo patientInfo={response?.patient} />
      <PatientHistory history={response?.history} isLoading={isLoading} />
    </MainContentLayout>
  );
}

export default Patient;

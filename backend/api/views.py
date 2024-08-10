from datetime import date, datetime

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .utils.firebird_db_queries import get_history, get_summary


class GetPatientsView(APIView):
    """
    Returns information about patients.
    Need two url-query params:
        ?department=<department>
        &date=<date in YYYY-MM-DD format>
    """

    http_method_names = ['get']

    @staticmethod
    def get(request):
        start_date = date.fromisoformat(
            request.query_params.get('date', datetime.now().date().isoformat())
        )
        department = request.query_params.get('department')
        summary = get_summary(start_date, department)
        start_datetime = datetime(year=start_date.year,
                                  month=start_date.month,
                                  day=start_date.day)
        data = list()
        for patient in summary:
            data.append(
                {
                    "card_id": patient.card_id,
                    "patient_id": patient.patient_id,
                    "full_name": patient.get_full_name(),
                    "age": patient.get_age(start_datetime),
                    "department": patient.department,
                    "diagnosis": (patient.admission_diagnosis
                                  or patient.incoming_diagnosis),
                    "admission_date": patient.get_admission_date(),
                    "result": patient.get_result(),
                    "is_outcome": patient.is_outcome(),
                }
            )
        return Response(data=data, status=status.HTTP_200_OK)


class GetPatientInfoView(APIView):
    """
    Returns information about patient.
    Need one url-query param:
        ?patient_id=<patient_id>
    """

    http_method_names = ['get']

    @staticmethod
    def get(request):
        patient_id = request.query_params.get('patient_id')
        if not patient_id:
            return Response(status=status.HTTP_404_NOT_FOUND)
        history = get_history(patient_id)
        data = list()
        for patient in history:
            data.append(
                {
                    "card_id": patient.card_id,
                    "patient_id": patient.patient_id,
                    "full_name": patient.get_full_name(),
                    "birthday": patient.get_birthday(),
                    "age": patient.get_age(),
                    "department": patient.department,
                    "diagnosis": (patient.admission_diagnosis
                                  or patient.incoming_diagnosis),
                    "admission_date": patient.get_admission_date(),
                    "result": patient.get_result(),
                    "is_outcome": patient.is_outcome(),
                    "doctor": patient.get_doctor(),
                    "workplace": patient.get_workplace(),
                    "address": patient.address,
                }
            )
        return Response(data=data, status=status.HTTP_200_OK)

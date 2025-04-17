from datetime import date, datetime

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .bsmp1_db.firebird_db_queries import get_history, get_patient, get_summary


class GetSummaryView(APIView):
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
        data = [
            {'patient': item['patient'].as_dict(start_date),
             'case_disease': item['case_disease'].as_dict()}
            for item in summary
        ]
        return Response(data=data, status=status.HTTP_200_OK)


class GetPatientView(APIView):
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
        data = get_patient(patient_id).as_dict()
        return Response(data=data, status=status.HTTP_200_OK)


class GetPatientHistoryView(APIView):
    """
    Returns patient history.
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
        data = {'patient': history['patient'].as_dict(),
                'history': [case_disease.as_dict()
                            for case_disease in history['history']]}
        return Response(data=data, status=status.HTTP_200_OK)

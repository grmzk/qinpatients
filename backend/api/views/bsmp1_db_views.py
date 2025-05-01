from datetime import date, datetime

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..bsmp1_db.firebird_db import BSMP1DBError
from ..bsmp1_db.repositories import (get_patient, get_patient_history,
                                     get_summary, search)


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
        try:
            summary = get_summary(start_date, department)
        except BSMP1DBError:
            return Response(data={"error": "BSMP №1 DB is not available"},
                            status=status.HTTP_502_BAD_GATEWAY)
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
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            patient = get_patient(patient_id)
        except BSMP1DBError:
            return Response(data={"error": "BSMP №1 DB is not available"},
                            status=status.HTTP_502_BAD_GATEWAY)
        if not patient:
            return Response(status=status.HTTP_404_NOT_FOUND)
        data = patient.as_dict()
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
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            history = get_patient_history(patient_id)
        except BSMP1DBError:
            return Response(data={"error": "BSMP №1 DB is not available"},
                            status=status.HTTP_502_BAD_GATEWAY)
        if not history:
            return Response(status=status.HTTP_404_NOT_FOUND)
        data = {'patient': history['patient'].as_dict(),
                'history': [case_disease.as_dict()
                            for case_disease in history['history']]}
        return Response(data=data, status=status.HTTP_200_OK)


class SearchView(APIView):
    """
        Returns search results.
        Need url-query params:
            ?start_date=<date in YYYY-MM-DD format> [required]
            &end_date=<date in YYYY-MM-DD format>   [required]
            &family=<family>                        [optional]
            &name=<name>                            [optional]
            &surname=<surname>                      [optional]
            &department=<department>                [optional]
    """

    http_method_names = ['get']

    @staticmethod
    def get(request):
        if not (request.query_params.get('start_date')
                and request.query_params.get('end_date')):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            start_date = date.fromisoformat(
                request.query_params.get('start_date')
            )
            end_date = date.fromisoformat(request.query_params.get('end_date'))
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        family = request.query_params.get('family', '').upper()
        name = request.query_params.get('name', '').upper()
        surname = request.query_params.get('surname', '').upper()
        department = request.query_params.get('department', '').upper()
        try:
            search_result = search(family, name, surname,
                                   start_date, end_date, department)
        except BSMP1DBError:
            return Response(data={"error": "BSMP №1 DB is not available"},
                            status=status.HTTP_502_BAD_GATEWAY)
        data = [
            {'patient': item['patient'].as_dict(),
             'case_disease': item['case_disease'].as_dict()}
            for item in search_result
        ]
        return Response(data=data, status=status.HTTP_200_OK)

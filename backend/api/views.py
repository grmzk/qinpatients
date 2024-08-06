from datetime import date, datetime

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .utils.firebird_db_queries import get_summary


class GetPatientsView(APIView):
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
                    "fullname": patient.get_full_name(),
                    "age": patient.get_age(start_datetime),
                    "department": patient.department,
                    "diagnosis": (patient.admission_diagnosis
                                  or patient.incoming_diagnosis),
                    "admission_date": patient.get_admission_date(),
                    "exam_duration": patient.get_result(),
                    "is_outcome": patient.is_outcome(),
                }
            )
        return Response(data=data, status=status.HTTP_200_OK)

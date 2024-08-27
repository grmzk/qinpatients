from django.urls import path

from .views import GetPatientHistoryView, GetPatientView, GetSummaryView

urlpatterns = [
    path('get_patient', GetPatientView.as_view()),
    path('get_patient_history', GetPatientHistoryView.as_view()),
    path('get_summary', GetSummaryView.as_view()),
]

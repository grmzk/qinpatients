from django.urls import path

from .views import GetPatientInfoView, GetPatientsView

urlpatterns = [
    path('get_patients', GetPatientsView.as_view()),
    path('get_patient_info', GetPatientInfoView.as_view()),
]

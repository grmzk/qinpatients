from django.urls import include, path
from djoser.views import TokenCreateView, TokenDestroyView

from .views import GetPatientHistoryView, GetPatientView, GetSummaryView

auth_patterns = [
    path('token/login/', TokenCreateView.as_view()),
    path('token/logout/', TokenDestroyView.as_view()),
]

urlpatterns = [
    path('get_patient', GetPatientView.as_view()),
    path('get_patient_history', GetPatientHistoryView.as_view()),
    path('get_summary', GetSummaryView.as_view()),
    path('auth/', include(auth_patterns)),
]

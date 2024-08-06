from django.urls import path

from .views import GetPatientsView

urlpatterns = [
    path('get_patients', GetPatientsView.as_view()),
]

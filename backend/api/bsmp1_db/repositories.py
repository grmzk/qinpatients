from datetime import date, datetime, timedelta

from .adapters import (get_patient_data, get_patient_history_data,
                       get_search_data, get_summary_data)
from .patient import Patient
from .utils import get_diary_today


def get_summary(start_date: date, department: str) -> list[dict]:
    start_datetime = datetime(year=start_date.year,
                              month=start_date.month,
                              day=start_date.day,
                              hour=8,
                              minute=0)
    end_datetime = start_datetime + timedelta(days=1)
    summary_data = get_summary_data(start_datetime, end_datetime)
    summary = []
    for item in summary_data:
        case_disease = item['case_disease']
        if (((department == 'РЕАН. ЗАЛ')
             and not case_disease.is_reanimation())
                or ((department not in ['ВСЕ ОТДЕЛЕНИЯ', 'РЕАН. ЗАЛ'])
                    and (department
                         not in [case_disease.department,
                                 case_disease.inpatient_department]))):
            continue
        if case_disease.is_processing() and start_date == get_diary_today():
            summary.append(item)
        elif (case_disease.admission_date >= start_datetime
                and (case_disease.is_outcome()
                     and (case_disease.admission_outcome_date
                          < end_datetime))):
            summary.append(item)
        elif (case_disease.admission_date < start_datetime
              and ((not case_disease.is_outcome())
                   or (case_disease.admission_outcome_date
                       >= start_datetime))):
            summary.append(item)
    return summary


def get_patient(patient_id: int) -> Patient | None:
    patient_data = get_patient_data(patient_id)
    return patient_data[0]['patient'] if patient_data else None


def get_patient_history(patient_id: int) -> dict | None:
    patient_history_data = get_patient_history_data(patient_id)
    history = list()
    for item in patient_history_data:
        history.append(item["case_disease"])
    return {'patient': patient_history_data[0]["patient"],
            'history': history}


def search(family: str, name: str, surname: str,
           start_date: date, end_date: date, department: str) -> list[dict]:
    return get_search_data(family + "%", name + "%", surname + "%",
                           start_date, end_date, department)

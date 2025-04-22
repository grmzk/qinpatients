from datetime import date, datetime, timedelta

from django.core.cache import cache

from qinpatients.settings import CACHE_TTL_LONG, CACHE_TTL_SHORT

from .adapters import get_from_db
from .patient import Patient
from .utils import get_diary_today


def get_summary(start_date: date, department: str) -> list[dict]:
    start_datetime = datetime(year=start_date.year,
                              month=start_date.month,
                              day=start_date.day,
                              hour=8,
                              minute=0)
    end_datetime = start_datetime + timedelta(days=1)
    summary_data: list
    if start_date.isoformat() not in cache:
        summary_data = get_from_db(
            where='main_card.d_in BETWEEN ? AND ?',
            order_by='main_card.id',
            params=[start_datetime - timedelta(days=1), end_datetime]
        )
        cache_ttl = CACHE_TTL_SHORT
        if start_date != get_diary_today():
            cache_ttl = CACHE_TTL_LONG
        cache.set(start_date.isoformat(), summary_data, timeout=cache_ttl)
    else:
        summary_data = cache.get(start_date.isoformat())
    summary = list()
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
    patient_data = get_from_db(
        where='main_card.id_pac = ?',
        order_by='main_card.id DESC',
        rows=1,
        params=[patient_id]
    )
    return patient_data[0]['patient'] if patient_data else None


def get_patient_history(patient_id: int) -> dict | None:
    history_data = get_from_db(
        where='main_card.id_pac = ?',
        order_by='main_card.id',
        params=[patient_id]
    )
    history = list()
    for item in history_data:
        history.append(item["case_disease"])
    return {'patient': history_data[0]["patient"],
            'history': history}


def search(family: str, name: str, surname: str,
           start_date: date, end_date: date) -> list[dict]:
    return get_from_db(
        where='(main_card.d_in BETWEEN ? AND ?) '
              '     AND (patient.fm LIKE ?) '
              '     AND (patient.im LIKE ?) '
              '     AND (patient.ot LIKE ?)',
        order_by='main_card.id',
        rows=200,
        params=[start_date, end_date, family + "%", name + "%", surname + "%"]
    )

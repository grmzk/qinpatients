from datetime import date, datetime, time, timedelta

from django.core.cache import cache

from qinpatients.settings import CACHE_TTL

from .firebird_db import fb_select_data
from .patients import Patient


def get_diary_today() -> date:
    diary_today = date.today()
    if datetime.now().time() < time(hour=8, minute=0):
        diary_today -= timedelta(days=1)
    return diary_today


def get_summary(start_date: date, department: str) -> list[Patient]:
    start_datetime = datetime(year=start_date.year,
                              month=start_date.month,
                              day=start_date.day,
                              hour=8,
                              minute=0)
    end_datetime = start_datetime + timedelta(days=1)
    select_query = (
        "SELECT main_card.id_pac, "
        "       main_card.id, "
        "       main_card.d_in, "
        "       main_card.d_out, "
        "       patient.fm, "
        "       patient.im, "
        "       patient.ot, "
        "       patient.dtr, "
        "       patient.pol, "
        "       department.short, "
        "       main_card.remzal, "
        "       main_card.dsnapr, "
        "       main_card.dspriem, "
        "       main_card.id_dvig, "
        "       main_card.id_otkaz, "
        "       inpatient_department.short, "
        "       doctor.last_name "
        "           || ' ' || doctor.first_name "
        "           || ' ' || doctor.middle_name "
        "FROM main_card "
        "   LEFT JOIN pacient patient ON main_card.id_pac = patient.id "
        "   LEFT JOIN priemnic department "
        "       ON main_card.id_priem = department.id "
        "   LEFT JOIN priemnic inpatient_department "
        "       ON main_card.id_gotd = inpatient_department.id "
        "   LEFT JOIN doctor ON main_card.amb_doc_id = doctor.doctor_id "
        "WHERE "
        "   (main_card.d_in >= ?) "
        "       AND (main_card.d_in < ?) "
        "ORDER BY main_card.id"
    )
    patients_data: list
    if start_date.isoformat() not in cache:
        patients_data = fb_select_data(
            select_query,
            [
                start_datetime - timedelta(days=1),
                end_datetime
            ]
        )
        cache.set(start_date.isoformat(), patients_data, timeout=CACHE_TTL)
    else:
        patients_data = cache.get(start_date.isoformat())
    unsorted_patients = list()
    for patient_data in patients_data:
        unsorted_patients.append(Patient(*patient_data))
    patients = list()
    for patient in unsorted_patients:
        if ((department != 'ВСЕ ОТДЕЛЕНИЯ')
                and (patient.department != department)):
            continue
        if patient.is_processing() and start_date == get_diary_today():
            patients.append(patient)
        elif (patient.admission_date >= start_datetime
                and (patient.is_outcome()
                     and patient.admission_outcome_date < end_datetime)):
            patients.append(patient)
        elif (patient.admission_date < start_datetime
              and ((not patient.is_outcome())
                   or patient.admission_outcome_date >= start_datetime)):
            patients.append(patient)
    return patients

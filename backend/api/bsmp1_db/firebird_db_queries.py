from datetime import date, datetime, time, timedelta

from django.core.cache import cache

from qinpatients.settings import CACHE_TTL_LONG, CACHE_TTL_SHORT

from .case_disease import CaseDisease
from .firebird_db import fb_select_data
from .patient import Patient


def get_diary_today() -> date:
    diary_today = date.today()
    if datetime.now().time() < time(hour=8, minute=0):
        diary_today -= timedelta(days=1)
    return diary_today


def get_summary(start_date: date, department: str) -> list[dict]:
    start_datetime = datetime(year=start_date.year,
                              month=start_date.month,
                              day=start_date.day,
                              hour=8,
                              minute=0)
    end_datetime = start_datetime + timedelta(days=1)
    select_query = (
        "SELECT main_card.id_pac, "
        "       patient.fm, "
        "       patient.im, "
        "       patient.ot, "
        "       patient.dtr, "
        "       patient.pol, "
        "       main_card.id, "
        "       main_card.d_in, "
        "       main_card.d_out, "
        "       department.short, "
        "       main_card.remzal, "
        "       main_card.dsnapr, "
        "       main_card.dspriem, "
        "       main_card.id_dvig, "
        "       main_card.id_otkaz, "
        "       inpatient_department.short "
        "FROM main_card "
        "   LEFT JOIN pacient patient ON main_card.id_pac = patient.id "
        "   LEFT JOIN priemnic department "
        "       ON main_card.id_priem = department.id "
        "   LEFT JOIN priemnic inpatient_department "
        "       ON main_card.id_gotd = inpatient_department.id "
        "WHERE "
        "   (main_card.d_in >= ?) "
        "       AND (main_card.d_in < ?) "
        "ORDER BY main_card.id"
    )
    summary_data: list
    if start_date.isoformat() not in cache:
        summary_data = fb_select_data(
            select_query,
            [
                start_datetime - timedelta(days=1),
                end_datetime
            ]
        )
        cache_ttl = CACHE_TTL_SHORT
        if start_date != get_diary_today():
            cache_ttl = CACHE_TTL_LONG
        cache.set(start_date.isoformat(), summary_data, timeout=cache_ttl)
    else:
        summary_data = cache.get(start_date.isoformat())
    unsorted_summary = list()
    for item in summary_data:
        unsorted_summary.append({'patient': Patient(*item[:6]),
                                 'case_disease': CaseDisease(*item[6:])})
    summary = list()
    for item in unsorted_summary:
        case_disease = item['case_disease']
        if (((department == 'РЕАН. ЗАЛ')
             and not case_disease.is_reanimation())
                or ((department not in ['ВСЕ ОТДЕЛЕНИЯ', 'РЕАН. ЗАЛ'])
                    and (case_disease.department != department))):
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


def get_address(address_id: int) -> str:    # noqa: C901
    select_query = (
        "SELECT field_name, field_value "
        "FROM person_address_fields "
        "WHERE addr_id = ? "
        "ORDER BY ord;"
    )
    data = fb_select_data(select_query, [address_id])
    if not data:
        return ''
    address_dict = {}
    for name, value in data:
        address_dict[name] = value
    address = ''
    if address_dict['государство']:
        address += address_dict['государство'] + ', '
    if address_dict['область']:
        address += address_dict['область'] + ', '
    if address_dict['район']:
        address += address_dict['район'] + ' район, '
    if address_dict['населенный пункт']:
        address += address_dict['населенный пункт'] + ', '
    if address_dict['округ']:
        address += address_dict['округ'] + ', '
    if address_dict['улица']:
        address += 'ул. ' + address_dict['улица'] + ', '
    if address_dict['дом'] and (address_dict['дом'] != '0'):
        address += (
            'д. ' + address_dict['дом'] + (address_dict['литера'] or '') + ', '
        )
    if address_dict['корпус'] and (address_dict['корпус'] != '0'):
        address += 'к. ' + address_dict['корпус'] + ', '
    if address_dict['квартира']:
        address += 'кв. ' + address_dict['квартира'] + ', '
    return address.removesuffix(', ').strip().upper()


def get_patient(patient_id: int) -> Patient:
    select_query = (
        "SELECT pacient.id, "
        "       pacient.fm, "
        "       pacient.im, "
        "       pacient.ot, "
        "       pacient.dtr, "
        "       pacient.pol, "
        "       pacient.id_adr, "
        "       rabota.rab, "
        "       pacient.rodst "
        "FROM pacient "
        "   LEFT JOIN rabota ON pacient.id_rab = rabota.id "
        "WHERE "
        "   pacient.id = ?"
    )
    patient_data = list(fb_select_data(select_query, [patient_id])[0])
    patient_data[6] = get_address(patient_data[6])
    return Patient(*patient_data)


def get_history(patient_id: int) -> dict:
    patient = get_patient(patient_id)
    select_query = (
        "SELECT main_card.id, "
        "       main_card.d_in, "
        "       main_card.d_out, "
        "       department.short, "
        "       main_card.remzal, "
        "       main_card.dsnapr, "
        "       main_card.dspriem, "
        "       main_card.id_dvig, "
        "       main_card.id_otkaz, "
        "       inpatient_department.short, "
        "       main_card.n_card1, "
        "       doctor.last_name "
        "           || ' ' || doctor.first_name "
        "           || ' ' || doctor.middle_name "
        "FROM main_card "
        "   LEFT JOIN priemnic department "
        "       ON main_card.id_priem = department.id "
        "   LEFT JOIN priemnic inpatient_department "
        "       ON main_card.id_gotd = inpatient_department.id "
        "   LEFT JOIN doctor ON main_card.amb_doc_id = doctor.doctor_id "
        "WHERE "
        "   main_card.id_pac = ? "
        "ORDER BY main_card.id"
    )
    history_data = fb_select_data(select_query, [patient_id])
    history = list()
    for case_disease_data in history_data:
        history.append(CaseDisease(*case_disease_data))
    return {'patient': patient,
            'history': history}

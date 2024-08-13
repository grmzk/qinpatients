from datetime import date, datetime, time, timedelta

from django.core.cache import cache

from qinpatients.settings import CACHE_TTL

from .firebird_db import fb_select_data
from .patient import Patient


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
        if (((department == 'РЕАН. ЗАЛ') and not patient.is_reanimation())
                or ((department not in ['ВСЕ ОТДЕЛЕНИЯ', 'РЕАН. ЗАЛ'])
                    and (patient.department != department))):
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


def get_history(patient_id: int) -> list[Patient]:
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
        "           || ' ' || doctor.middle_name, "
        "       workplace.rab, "
        "       main_card.id_adr, "
        "       main_card.n_card1 "
        "FROM main_card "
        "   LEFT JOIN pacient patient ON main_card.id_pac = patient.id "
        "   LEFT JOIN priemnic department "
        "       ON main_card.id_priem = department.id "
        "   LEFT JOIN priemnic inpatient_department "
        "       ON main_card.id_gotd = inpatient_department.id "
        "   LEFT JOIN doctor ON main_card.amb_doc_id = doctor.doctor_id "
        "   LEFT JOIN rabota workplace ON main_card.id_rab = workplace.id "
        "WHERE "
        "   main_card.id_pac = ? "
        "ORDER BY main_card.id"
    )
    patients_data = fb_select_data(select_query, [patient_id])
    address = get_address(patients_data[-1][-2])
    history = list()
    for patient_data in patients_data:
        patient_data = list(patient_data)
        patient_data[-2] = address
        history.append(Patient(*patient_data))
    return history

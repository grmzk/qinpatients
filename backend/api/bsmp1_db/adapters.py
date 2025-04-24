from datetime import date, datetime, timedelta

from api.bsmp1_db.case_disease import CaseDisease
from api.bsmp1_db.firebird_db import fb_select_data
from api.bsmp1_db.patient import Patient
from api.bsmp1_db.utils import get_address_from_array, make_uniq_data


def get_from_db(where: str, params: [],
                order_by: str = None, rows: int = None) -> list:
    delimiter = '<|>'
    query = (
        "SELECT patient.id, "
        "       patient.fm, "
        "       patient.im, "
        "       patient.ot, "
        "       patient.dtr, "
        "       patient.pol, "
        "       workplace.rab, "
        "       patient.rodst, "
        "       state.field_value "
        f"          || '{delimiter}' || region.field_value "
        f"          || '{delimiter}' || region_district.field_value "
        f"          || '{delimiter}' || locality.field_value "
        f"          || '{delimiter}' || locality_district.field_value "
        f"          || '{delimiter}' || street.field_value "
        f"          || '{delimiter}' || house.field_value "
        f"          || '{delimiter}' || letter.field_value "
        f"          || '{delimiter}' || building.field_value "
        f"          || '{delimiter}' || flat.field_value, "
        "       main_card.id, "
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
        "   LEFT JOIN pacient patient ON main_card.id_pac = patient.id "
        "   LEFT JOIN rabota workplace ON main_card.id_rab = workplace.id "
        "   LEFT JOIN person_address_fields state "
        "       ON ( patient.id_adr = person_address_fields.addr_id "
        "               AND person_address_fields.ord = 1 ) "
        "   LEFT JOIN person_address_fields region "
        "       ON ( patient.id_adr = person_address_fields.addr_id "
        "               AND person_address_fields.ord = 2 ) "
        "   LEFT JOIN person_address_fields region_district "
        "       ON ( patient.id_adr = person_address_fields.addr_id "
        "               AND person_address_fields.ord = 3 ) "
        "   LEFT JOIN person_address_fields locality "
        "       ON ( patient.id_adr = person_address_fields.addr_id "
        "               AND person_address_fields.ord = 4 ) "
        "   LEFT JOIN person_address_fields locality_district "
        "       ON ( patient.id_adr = person_address_fields.addr_id "
        "               AND person_address_fields.ord = 5 ) "
        "   LEFT JOIN person_address_fields street "
        "       ON ( patient.id_adr = person_address_fields.addr_id "
        "               AND person_address_fields.ord = 6 ) "
        "   LEFT JOIN person_address_fields house "
        "       ON ( patient.id_adr = person_address_fields.addr_id "
        "               AND person_address_fields.ord = 7 ) "
        "   LEFT JOIN person_address_fields letter "
        "       ON ( patient.id_adr = person_address_fields.addr_id "
        "               AND person_address_fields.ord = 8 ) "
        "   LEFT JOIN person_address_fields building "
        "       ON ( patient.id_adr = person_address_fields.addr_id "
        "               AND person_address_fields.ord = 9 ) "
        "   LEFT JOIN person_address_fields flat "
        "       ON ( patient.id_adr = person_address_fields.addr_id "
        "               AND person_address_fields.ord = 10 ) "
        "   LEFT JOIN priemnic department "
        "       ON main_card.id_priem = department.id "
        "   LEFT JOIN priemnic inpatient_department "
        "       ON main_card.id_gotd = inpatient_department.id "
        "   LEFT JOIN doctor ON main_card.amb_doc_id = doctor.doctor_id"
    )
    query += f' WHERE {where}'
    if order_by:
        query += f' ORDER BY {order_by}'
    if rows:
        query += f' ROWS {rows}'
    response = fb_select_data(query, params)
    data = list()
    for item in response:
        patient = Patient(*item[:9])
        if patient.address:
            patient.address = (
                get_address_from_array(patient.address.split(delimiter))
            )
        data.append({'patient': patient,
                     'case_disease': CaseDisease(*item[9:])})
    return make_uniq_data(data)


def get_summary_data(start_datetime: datetime, end_datetime: datetime) -> list:
    return get_from_db(
        where='main_card.d_in BETWEEN ? AND ?',
        order_by='main_card.id',
        params=[start_datetime - timedelta(days=1), end_datetime]
    )


def get_patient_data(patient_id: int):
    return get_from_db(
        where='main_card.id_pac = ?',
        order_by='main_card.id',
        rows=1,
        params=[patient_id]
    )


def get_patient_history_data(patient_id: int) -> list:
    return get_from_db(
        where='main_card.id_pac = ?',
        order_by='main_card.id',
        params=[patient_id]
    )


def get_search_data(family: str, name: str, surname: str,
                    start_date: date, end_date: date, department: str) -> list:
    where = (
        "main_card.id_pac IN ("
        "         SELECT id "
        "         FROM pacient "
        "         WHERE (pacient.fm LIKE ?) "
        "             AND (pacient.im LIKE ?) "
        "             AND (pacient.ot LIKE ?)"
        "     ) "
        "     AND (main_card.d_in BETWEEN ? AND ?)"
    )
    params = [family + "%", name + "%", surname + "%", start_date, end_date]

    if department and department != 'ВСЕ ОТДЕЛЕНИЯ':
        if department == 'РЕАН. ЗАЛ':
            where += (
                " AND (main_card.remzal <> 'F')"
            )
        else:
            where += (
                " AND (main_card.id_priem IN ("
                "         SELECT id "
                "         FROM priemnic "
                "         WHERE short = ?"
                "     )"
                " )"
            )
            params.append(department)

    return get_from_db(
        where=where,
        order_by='main_card.id',
        # rows=200,
        params=params
    )

from dataclasses import dataclass
from datetime import datetime, timedelta

STATUS_INPATIENT = 7
STATUS_OUTPATIENT_MAIN = 8
STATUS_OTHER_HOSPITAL = 9
STATUS_PROCESSING = 10

STATUS_OUTPATIENT = 1
STATUS_OVER_DIAGNOSIS = 2
STATUS_DIS_DIAGNOSIS = 3
STATUS_UNREASON_DIRECTED = 4
STATUS_SELF_DENIAL = 5
STATUS_UNREASON_DENY = 6
STATUS_SELF_LEAVE = 188

STATUSES = {
    STATUS_INPATIENT: 'ГОСПИТАЛИЗАЦИЯ',
    STATUS_OUTPATIENT_MAIN: 'АМБУЛАТОРНОЕ ЛЕЧЕНИЕ',
    STATUS_OTHER_HOSPITAL: 'НАПРАВЛЕН В ДРУГОЙ СТАЦИОНАР',
    STATUS_PROCESSING: 'ОБСЛЕДУЕТСЯ'
}

REJECTIONS = {
    STATUS_OUTPATIENT: 'АМБУЛАТОРНОЕ ЛЕЧЕНИЕ',
    STATUS_OVER_DIAGNOSIS: 'ГИПЕРДИАГНОСТИКА',
    STATUS_DIS_DIAGNOSIS: 'РАСХОЖДЕНИЕ ДИАГНОЗА',
    STATUS_UNREASON_DIRECTED: 'НЕОБОСНОВАННО НАПРАВЛЕН',
    STATUS_SELF_DENIAL: 'САМООТКАЗ',
    STATUS_UNREASON_DENY: 'НЕОБОСНОВАННЫЙ ОТКАЗ',
    STATUS_SELF_LEAVE: 'САМОУХОД'
}


@dataclass
class Patient:
    patient_id: int
    card_id: int
    admission_date: datetime
    admission_outcome_date: datetime
    family: str
    name: str
    surname: str
    birthday: datetime
    gender: str
    department: str
    reanimation: str
    incoming_diagnosis: str
    admission_diagnosis: str
    status: int
    reject: int
    inpatient_department: str
    doctor: str
    workplace: str = ''
    address: str = ''

    @staticmethod
    def get_date(date: datetime) -> str:
        return date.strftime('%d.%m.%Y %H:%M')

    def get_admission_date(self) -> str:
        return self.get_date(self.admission_date)

    def get_admission_outcome_date(self) -> str:
        return self.get_date(self.admission_outcome_date)

    def get_full_name(self) -> str:
        full_name = f'{self.family} {self.name} {self.surname}'.strip()
        if not full_name:
            if self.gender == 'M':
                return 'НЕИЗВЕСТНЫЙ'
            return 'НЕИЗВЕСТНАЯ'
        return full_name

    def get_birthday(self) -> str:
        return self.birthday.strftime('%d.%m.%Y')

    def get_age(self, date: datetime = datetime.now()) -> str:
        birthday = self.birthday
        age = (date.year - birthday.year
               - ((date.month, date.day) < (birthday.month, birthday.day)))
        ending: str
        if 5 <= age <= 20:
            ending = 'лет'
        elif age % 10 == 1:
            ending = 'год'
        elif 2 <= age % 10 <= 4:
            ending = 'года'
        else:
            ending = 'лет'
        return f'{age} {ending}'

    def is_reanimation(self) -> bool:
        if self.reanimation == 'F':
            return False
        return True

    def is_inpatient(self) -> bool:
        return bool(self.inpatient_department)

    def is_outpatient(self) -> bool:
        return self.status == STATUS_OUTPATIENT_MAIN

    def is_other_hospital(self) -> bool:
        return self.status == STATUS_OTHER_HOSPITAL

    def is_processing(self) -> bool:
        if (self.is_reanimation()
                and ((self.admission_date + timedelta(hours=2, minutes=30))
                     > datetime.now())):
            return True
        return self.status == STATUS_PROCESSING

    def is_outcome(self) -> bool:
        return not self.is_processing()

    def get_result(self):
        if self.is_reanimation():
            if self.admission_diagnosis and self.inpatient_department:
                return f'ГОСПИТАЛИЗАЦИЯ [{self.inpatient_department}]'
            return 'РЕАНИМАЦИОННЫЙ ЗАЛ'
        if self.is_processing():
            exam_duration = datetime.now() - self.admission_date
            hours = int(exam_duration.total_seconds() // 3600)
            minutes = int(exam_duration.total_seconds() % 3600 // 60)
            if hours < 0:
                return '0 ч. 0 мин.'
            return f'{hours} ч. {minutes} мин.'
        if self.is_inpatient():
            return f'ГОСПИТАЛИЗАЦИЯ [{self.inpatient_department}]'
        if self.is_outpatient():
            if self.reject != STATUS_OUTPATIENT:
                return f'АМБУЛАТОРНОЕ ЛЕЧЕНИЕ [{REJECTIONS[self.reject]}]'
            return 'АМБУЛАТОРНОЕ ЛЕЧЕНИЕ'
        if self.is_other_hospital():
            return 'ДРУГОЙ СТАЦИОНАР'
        return 'НЕИЗВЕСТНО'

    def get_doctor(self):
        return self.doctor or ''

    def get_workplace(self):
        return self.workplace or 'НЕ РАБОТАЕТ'

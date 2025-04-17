from dataclasses import dataclass
from datetime import datetime, timedelta

from .constants import (REJECTIONS, STATUS_OTHER_HOSPITAL, STATUS_OUTPATIENT,
                        STATUS_OUTPATIENT_MAIN, STATUS_PROCESSING)


@dataclass
class CaseDisease:
    card_id: int
    admission_date: datetime
    admission_outcome_date: datetime
    department: str
    reanimation: str
    incoming_diagnosis: str
    admission_diagnosis: str
    status: int
    reject: int
    inpatient_department: str
    inpatient_id: int | None = None
    doctor: str = ''

    def get_admission_date(self) -> str:
        return self.admission_date.strftime('%d.%m.%Y %H:%M')

    def get_admission_outcome_date(self) -> str | None:
        if not self.admission_outcome_date:
            return None
        return self.admission_outcome_date.strftime('%d.%m.%Y %H:%M')

    def is_reanimation(self) -> bool:
        if self.reanimation == 'F':
            return False
        return True

    def get_diagnosis(self):
        return self.admission_diagnosis or self.incoming_diagnosis

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

    def get_result(self) -> str:
        if self.is_reanimation():
            if self.admission_diagnosis and self.is_inpatient():
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

    def get_doctor(self) -> str:
        return self.doctor or ''

    def get_inpatient_id(self) -> int | str:
        return self.inpatient_id or ''

    def as_dict(self):
        return {
            'card_id': self.card_id,
            'admission_date': self.get_admission_date(),
            'admission_outcome_date': self.get_admission_outcome_date(),
            'department': self.department,
            'diagnosis': self.get_diagnosis(),
            'inpatient_id': self.get_inpatient_id(),
            'doctor': self.get_doctor(),
            'result': self.get_result(),
            'is_reanimation': self.is_reanimation(),
            'is_outcome': self.is_outcome(),
            'is_inpatient': self.is_inpatient(),
        }

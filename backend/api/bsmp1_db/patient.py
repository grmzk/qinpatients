from dataclasses import dataclass
from datetime import date, datetime


@dataclass
class Patient:
    patient_id: int
    family: str
    name: str
    surname: str
    birthday: datetime
    sex: str
    workplace: str
    extra_info: str
    address: str

    def get_full_name(self) -> str:
        full_name = f'{self.family} {self.name} {self.surname}'.strip()
        if not full_name:
            if self.sex == 'M':
                return 'НЕИЗВЕСТНЫЙ'
            return 'НЕИЗВЕСТНАЯ'
        return full_name

    def get_birthday(self) -> str:
        return self.birthday.strftime('%d.%m.%Y')

    def get_age(self, at_date: date = datetime.now().date()) -> str:
        birthday = self.birthday
        age = (at_date.year - birthday.year
               - ((at_date.month, at_date.day)
                  < (birthday.month, birthday.day)))
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

    def get_workplace(self) -> str:
        return self.workplace or 'НЕ РАБОТАЕТ'

    def get_extra_info(self) -> str:
        return self.extra_info or 'НЕТ ДАННЫХ'

    def as_dict(self, at_date: date = datetime.now().date()) -> dict:
        return {
            'patient_id': self.patient_id,
            'family': self.family.upper() if self.family else '',
            'name': self.name.upper() if self.name else '',
            'surname': self.surname.upper() if self.surname else '',
            'full_name': self.get_full_name(),
            'birthday': self.get_birthday(),
            'age': self.get_age(at_date),
            'sex': self.sex or '',
            'workplace': (
                self.get_workplace().upper() if self.workplace else ''
            ),
            'address': self.address.upper() if self.address else '',
            'extra_info': (
                self.get_extra_info().upper() if self.extra_info else ''
            ),
        }

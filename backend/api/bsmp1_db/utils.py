from datetime import date, datetime, time, timedelta


def get_diary_today() -> date:
    diary_today = date.today()
    if datetime.now().time() < time(hour=8, minute=0):
        diary_today -= timedelta(days=1)
    return diary_today


def get_address_from_array(address_array: list[str]) -> str:   # noqa: C901
    if not address_array:
        return ''
    address = ''
    if address_array[0]:
        address += address_array[0] + ', '
    if address_array[1]:
        address += address_array[1] + ', '
    if address_array[2]:
        address += address_array[2] + ' район, '
    if address_array[3]:
        address += address_array[3] + ', '
    if address_array[4]:
        address += address_array[4] + ', '
    if address_array[5]:
        address += 'ул. ' + address_array[5] + ', '
    if address_array[6] and (address_array[6] != '0'):
        address += (
            'д. ' + address_array[6] + (address_array[7] or '') + ', '
        )
    if address_array[8] and (address_array[8] != '0'):
        address += 'к. ' + address_array[8] + ', '
    if address_array[9]:
        address += 'кв. ' + address_array[9] + ', '
    return address.removesuffix(', ').strip().upper()

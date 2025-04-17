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

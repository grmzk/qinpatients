"use strict";

import {
    BASE_URL,
    INPUT_DIARY_TIMEOUT,
    UPDATE_PATIENTS_INTERVAL,
} from './config.js';

const DEPARTMENTS = [
    "ТРАВМАТОЛОГИЯ",
    "НЕЙРОХИРУРГИЯ",
    "I ХИРУРГИЯ",
    "II ХИРУРГИЯ",
    "УРОЛОГИЯ",
    "ОЖОГОВОЕ",
    "НЕВРОЛОГИЯ",
    "КАРДИОЛОГИЯ",
    "ГИНЕКОЛОГИЯ",
    "ТОКСИКОЛОГИЯ",
    "1 ТЕРАПИЯ",
    "2 ТЕРАПИЯ",
    "РЕАН. ЗАЛ",
    "ВСЕ ОТДЕЛЕНИЯ",
]

let selected_department = DEPARTMENTS[0];
let update_patients_timer;
let input_diary_timeout;


setCurrentDiaryDate();
addInputDiaryDateEventListener();
fillDepartmentsTable(DEPARTMENTS);
selectDepartment(selected_department);


function setCurrentDiaryDate() {
    let diary_date = new Date();
    if (diary_date.getHours() < 8) {
        diary_date.setDate(diary_date.getDate() - 1);
    }
    let yyyy = diary_date.getFullYear();
    let mm = String(diary_date.getMonth() + 1).padStart(2, "0");
    let dd = String(diary_date.getDate()).padStart(2, "0");
    let diary_date_str = `${yyyy}-${mm}-${dd}`;
    let input_diary_date = document.getElementById("input-diary-date");
    input_diary_date.value = diary_date_str;
}


function addInputDiaryDateEventListener() {
    let input_diary_date = document.getElementById("input-diary-date");
    input_diary_date.addEventListener("input", function () {
        waitInputDiaryDate();
    });
}


function waitInputDiaryDate(last_date = null) {
    let date = getInputDiaryDate();
    if (date === last_date) {
        updatePatientsTable(true);
    } else {
        clearTimeout(input_diary_timeout);
        input_diary_timeout = setTimeout(waitInputDiaryDate, INPUT_DIARY_TIMEOUT, date);
    }
}


function fillDepartmentsTable(departments) {
    let html = "";
    departments.forEach(department => {
        html += `<tr class="table-row table-row-department"><td>${department}</td></tr>`;
    });
    let table = document.getElementById("table-departments");
    table.innerHTML = html;
    let rows = document.querySelectorAll(".table-row-department");
    rows.forEach(row => {
        row.addEventListener("click", function () {
            let selected_row = document.querySelector(
                `.table-row-department.mark-selected`
            );
            selected_row.classList.remove("mark-selected");
            selected_department = row.textContent;
            selectDepartment(selected_department);
        });
    });
}


function selectDepartment(selected_department) {
    let rows = document.querySelectorAll(".table-row-department");
    rows.forEach(row => {
        if (row.textContent === selected_department) {
            row.classList.add("mark-selected");
            updatePatientsTable(true);
        }
    });
}


function updatePatientsTable(clear_table = false) {
    if (clear_table) {
        clearInterval(update_patients_timer);
        update_patients_timer = setInterval(updatePatientsTable, UPDATE_PATIENTS_INTERVAL);
        let table = document.getElementById("table-patients");
        table.innerHTML = "";
    }

    let date = getInputDiaryDate();
    fetch(`${BASE_URL}/api/get_patients?department=${selected_department}&date=${date}`)
        .then(response => response.json())
        .then(data => {
            addPatientsToTable(data);
        })
        .catch(error => console.log(error));
}


function getInputDiaryDate() {
    let input_diary_date= document.getElementById("input-diary-date");
    return  input_diary_date.value;
}


function addPatientsToTable(patients) {
    let table = document.getElementById("table-patients");
    table.innerHTML = `<caption class="table-caption">СПИСОК ОБРАЩЕНИЙ</caption>`;
    if (patients.length === 0) {
        table.innerHTML += "<tr><th>НЕТ ОБРАЩЕНИЙ</th></tr>";
        return;
    }

    let html = `
        <tr>
            <th>№</th>
            <th>АСУ</th>
            <th>Ф. И. О.</th>
            <th>Возраст</th>
            <th>Отделение</th>
            <th>Диагноз</th>
            <th>Время поступления</th>
            <th>Время обследования / результат</th>
        </tr>
    `;

    let number = 0;
    patients.forEach(patient => {
        number++;
        let mark_font = "";
        let mark_background = "";
        if (patient["is_reanimation"]) {
            mark_font = "mark-reanimation";
        } else if (patient["is_inpatient"]) {
            mark_font = "mark-inpatient";
        }
        if (patient["is_outcome"]) {
            mark_background = "mark-outcome";
        }
        html += `<tr class="table-row table-row-patient ${mark_font} ${mark_background}" id="${patient["patient_id"]}">`;
        html += `<td>${number}</td>`;
        html += `<td>${patient["card_id"]}</td>`;
        html += `<td>${patient["full_name"]}</td>`;
        html += `<td>${patient["age"]}</td>`;
        html += `<td>${patient["department"]}</td>`;
        html += `<td>${patient["diagnosis"]}</td>`;
        html += `<td>${patient["admission_date"]}</td>`;
        html += `<td>${patient["result"]}</td>`;
        html += "</tr>";
    });

    table.innerHTML += html;
    let rows = document.querySelectorAll(".table-row-patient");
    rows.forEach(row => {
        row.addEventListener("dblclick", function () {
            document.location.href = `html/patient_info.html?patient_id=${row.id}`;
        });
    });
}

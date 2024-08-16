"use strict";

import { BASE_URL } from './config.js';
import { getURLParam } from './utils.js';


/* adding passport data from separate file */
await fetch('../html/patient_data.html')
    .then(response => response.text())
    .then(html => document.getElementById('card-left').innerHTML = html);

updateCasesTable()


function updateCasesTable() {
    fetch(`${BASE_URL}/api/get_patient_history?patient_id=${getURLParam("patient_id")}`)
        .then(response => response.json())
        .then(data => {
            addCasesToTable(data);
        })
        .catch(error => console.log(error));
}


function addCasesToTable(history) {
    const patient = history["patient"];
    const cases = history["history"];

    document.getElementById("patient-data").style.display = "block";
    document.getElementById("full-name").textContent = patient["full_name"];
    document.getElementById("birthday").textContent = patient["birthday"];
    document.getElementById("age").textContent = patient["age"];
    document.getElementById("address").textContent = patient["address"];
    document.getElementById("workplace").textContent = patient["workplace"];
    document.getElementById("extra-info").textContent = patient["extra_info"];

    let table = document.getElementById("table-cases");
    table.innerHTML = `<caption class="table-caption">СПИСОК ОБРАЩЕНИЙ ПАЦИЕНТА [БД БСМП №1]</caption>`;
    if (cases.length === 0) {
        table.innerHTML += "<tr><th>НЕТ ОБРАЩЕНИЙ</th></tr>";
        return;
    }

    let html = `
        <tr>
            <th>№</th>
            <th>АСУ</th>
            <th>Стац. номер</th>
            <th>Время поступления</th>
            <th>Отделение</th>
            <th>Диагноз</th>
            <th>Врач</th>
            <th>Исход</th>
        </tr>
    `;

    let number = 0;
    cases.forEach(case_disease => {
        number++;
        let mark_font = "";
        let mark_background = "";
        if (case_disease["is_reanimation"]) {
            mark_font = "mark-reanimation";
        } else if (case_disease["is_inpatient"]) {
            mark_font = "mark-inpatient";
        }
        if (case_disease["is_outcome"] === true) {
            mark_background = "mark-outcome";
        }
        html += `<tr class="table-row table-row-case ${mark_font} ${mark_background}" id="${case_disease["card_id"]}">`;
        html += `<td>${number}</td>`;
        html += `<td>${case_disease["card_id"]}</td>`;
        html += `<td>${case_disease["inpatient_id"]}</td>`;
        html += `<td>${case_disease["admission_date"]}</td>`;
        html += `<td>${case_disease["department"]}</td>`;
        html += `<td>${case_disease["diagnosis"]}</td>`;
        html += `<td>${case_disease["doctor"]}</td>`;
        html += `<td>${case_disease["result"]}</td>`;
        html += "</tr>";
    });

    table.innerHTML += html;
    let rows = document.querySelectorAll(".table-row-case");
    rows.forEach(row => {
        row.addEventListener("dblclick", function () {
            console.log(row.id);
        });
    });
}

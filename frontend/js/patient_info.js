"use strict";

import { BASE_URL } from './config.js';


updateCasesTable()


function updateCasesTable() {
    fetch(`${BASE_URL}/api/get_patient_info?patient_id=${getURLParam("patient_id")}`)
        .then(response => response.json())
        .then(data => {
            addCasesToTable(data);
        })
        .catch(error => console.log(error));
}


function getURLParam(paramName) {
    const params = new URLSearchParams(window.location.search);
    return params.get(paramName);
}


function addCasesToTable(cases) {
    document.getElementById("patient-info").style.display = "block";
    document.getElementById("full-name").textContent = cases[0]["full_name"];
    document.getElementById("birthday").textContent = cases[0]["birthday"];
    document.getElementById("age").textContent = cases[0]["age"];
    document.getElementById("address").textContent = cases[0]["address"];
    document.getElementById("workplace").textContent = cases[0]["workplace"];

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
        if (case_disease["result"].startsWith("РЕАНИМАЦИОННЫЙ ЗАЛ")) {
            mark_font = "mark-reanimation";
        } else if (case_disease["result"].startsWith("ГОСПИТАЛИЗАЦИЯ")) {
            mark_font = "mark-inpatient";
        }
        if (case_disease["is_outcome"] === true) {
            mark_background = "mark-outcome";
        }
        html += `<tr class="table-row table-row-case ${mark_font} ${mark_background}" id="${case_disease["card_id"]}">`;
        html += `<td>${number}</td>`;
        html += `<td>${case_disease["card_id"]}</td>`;
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

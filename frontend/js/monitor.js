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
    "ВСЕ ОТДЕЛЕНИЯ",
]
const UPDATE_PATIENTS_INTERVAL = 30000;
const INPUT_DIARY_TIMEOUT = 1500;
let selected_department = DEPARTMENTS[0];
let update_patients_timer;
let input_diary_timeout;


function fillDepartmentsTable(departments) {
    let html = "";
    departments.forEach(department => {
        html += `<tr class="row-departments"><td>${department}</td></tr>`;
    });
    let table = document.getElementById("table-departments");
    table.innerHTML = html;
    let rows = document.querySelectorAll(".row-departments");
    rows.forEach(row => {
        row.addEventListener("click", function () {
            let selected_row = document.querySelector(".selected-department");
            selected_row.classList.remove("selected-department");
            selected_department = row.textContent;
            selectDepartment(selected_department);
        });
    });
}


function addPatientsToTable(patients) {
    let html = `
        <tr>
            <th>№</th>
            <th>АСУ</th>
            <th>Ф. И. О.</th>
            <th>Возраст</th>
            <th>Отделение</th>
            <th>Диагноз</th>
            <th>Время поступления</th>
            <th>Время обследования</th>
        </tr>
    `;
    let number = 0;
    patients.forEach(patient => {
        number++;
        let mark_font = "";
        let mark_background = "";
        if (patient["exam_duration"].startsWith("РЕАНИМАЦИОННЫЙ ЗАЛ")) {
            mark_font = "mark-reanimation";
        } else if (patient["exam_duration"].startsWith("ГОСПИТАЛИЗАЦИЯ")) {
            mark_font = "mark-inpatient";
        }
        if (patient["is_outcome"] === true) {
            mark_background = "mark-outcome";
        }
        html += `<tr class="row-patients ${mark_font} ${mark_background}" id="${patient["card_id"]}">`;
        html += `<td>${number}</td>`;
        html += `<td>${patient["card_id"]}</td>`;
        html += `<td>${patient["fullname"]}</td>`;
        html += `<td>${patient["age"]}</td>`;
        html += `<td>${patient["department"]}</td>`;
        html += `<td>${patient["diagnosis"]}</td>`;
        html += `<td>${patient["admission_date"]}</td>`;
        html += `<td>${patient["exam_duration"]}</td>`;
        html += "</tr>";
    });
    let table = document.getElementById("table-patients");
    table.innerHTML = html;
    let rows = document.querySelectorAll(".row-patients");
    rows.forEach(row => {
        row.addEventListener("dblclick", function () {
            console.log(row.id);
        });
    });
}


function getInputDiaryDate() {
    let input_diary_date= document.getElementById("input-diary-date");
    return  input_diary_date.value;
}


function updatePatientsTable(clear_table = false) {
    if (clear_table) {
        clearInterval(update_patients_timer);
        update_patients_timer = setInterval(updatePatientsTable, UPDATE_PATIENTS_INTERVAL);
        let table = document.getElementById("table-patients");
        table.innerHTML = "";
    }
    let date = getInputDiaryDate();
    fetch(`http://127.0.0.1:8000/api/get_patients?department=${selected_department}&date=${date}`)
        .then(response => response.json())
        .then(data => {
            addPatientsToTable(data);
        })
        .catch(error => console.log(error));
}


function selectDepartment(selected_department) {
    let rows = document.querySelectorAll(".row-departments");
    rows.forEach(row => {
        if (row.textContent === selected_department) {
            row.classList.add("selected-department");
            updatePatientsTable(true);
        }
    });
}


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


function waitInputDiaryDate(last_date = null) {
    let date = getInputDiaryDate();
    if (date === last_date) {
        updatePatientsTable(true);
    } else {
        clearTimeout(input_diary_timeout);
        input_diary_timeout = setTimeout(waitInputDiaryDate, INPUT_DIARY_TIMEOUT, date);
    }
}


function addInputDiaryDateEventListener() {
    let input_diary_date = document.getElementById("input-diary-date");
    input_diary_date.addEventListener("input", function () {
        waitInputDiaryDate();
    });
}


setCurrentDiaryDate();
addInputDiaryDateEventListener();
fillDepartmentsTable(DEPARTMENTS);
selectDepartment(selected_department);
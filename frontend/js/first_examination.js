"use strict";

const BUTTONS_FEATURES = {
    "complaints-button": {
        "values": {
            "энцефалопатия": "невозможно выяснить ввиду выраженной энцефалопатии у пациента. ",
            "тяжелое состояние": "невозможно выяснить ввиду тяжести состояния пациента. ",
        },
        "text_field_id": "complaints-textarea",
    },
    "anamnesis-button": {
        "values": {
            "со слов пациента": "со слов пациента: ",
            "со слов сопровождения": "со слов сопровождения: ",
            "со слов бригады СМП": "со слов бригады СМП: ",
            "без дополнений": "без дополнений. ",
        },
        "text_field_id": "anamnesis-textarea",
    },
}


setButtonEnable("anamnesis-patient-tell", "anamnesis-button");
setButtonsHandlers("complaints-button", true);
setButtonsHandlers("anamnesis-button", true);
setButtonsHandlers("tuberculosis-button", false);
setButtonsHandlers("hepatitis-button", false);
setButtonsHandlers("hiv-button", false);
setButtonsHandlers("diabetes-button", false);
setButtonsHandlers("drugs-button", false);
setButtonsHandlers("allergy-button", false);
setButtonsHandlers("tetanus-button", false);
setButtonsHandlers("operations-button", false);
setButtonsHandlers("trauma-button", false);
setButtonsHandlers("pregnancies-button", false);
setButtonsHandlers("childbirths-button", false);
setButtonsHandlers("mensis-button", false);
setButtonsHandlers("condition-button", false);
setButtonsHandlers("additional-support-button", true);
setButtonsHandlers("mind-button", false);
setButtonsHandlers("alcoholic-intoxication-button", true);
setButtonsHandlers("skin-button", false);
setButtonsHandlers("breath-right-button", false);
setButtonsHandlers("breath-left-button", false);
addComplaintsEncephalopathyButtonHandler();
addComplaintsGraveConditionButtonHandler();
addAdditionalSupportButtonsHandlers();
addMindButtonsHandlers();
setTextareaScrolling("complaints-textarea");
setTextareaScrolling("anamnesis-textarea");


function setButtonEnable(button_id, button_class) {
    let button = document.getElementById(button_id);
    if (button.classList.contains("mark-selected")) {
        return;
    }
    let related_buttons = document.querySelectorAll(`.${button_class}`);
    if (button_class in BUTTONS_FEATURES) {
        setTextFieldText(button, related_buttons, button_class);
    }
    toggleButton(button, related_buttons);
}


function addComplaintsEncephalopathyButtonHandler() {
    let button = document.getElementById("complaints-encephalopathy");
    button.addEventListener("click", (e) => {
        if (!button.classList.contains("mark-selected")) {
            return;
        }
        setButtonEnable("mind-encephalopathy", "mind-button");
    });
}


function addComplaintsGraveConditionButtonHandler() {
    let button = document.getElementById("complaints-grave-condition");
    button.addEventListener("click", (e) => {
        if (!button.classList.contains("mark-selected")) {
            return;
        }
        let condition_button = document.querySelector(".condition-button.mark-selected");
        if (["удовлетворительное", "относительно удовлетворительное", "средней тяжести"].includes(condition_button.textContent)) {
            setButtonEnable("condition-grave", "condition-button");
        }
        let mind_button = document.querySelector(".mind-button.mark-selected");
        if (mind_button.textContent === "ясное") {
            setButtonEnable("mind-sopor", "mind-button");
        }
    });
}


function addAdditionalSupportButtonsHandlers() {
    let buttons = document.querySelectorAll(".additional-support-button");
    buttons.forEach(button => {
        if (["ИВЛ", "вазопрессорная поддержка"].includes(button.textContent)) {
            button.addEventListener("click", (e) => {
                if (!button.classList.contains("mark-selected")) {
                    return;
                }
                let condition_button = document.querySelector(".condition-button.mark-selected");
                if (["удовлетворительное", "относительно удовлетворительное", "средней тяжести"].includes(condition_button.textContent)) {
                    setButtonEnable("condition-grave", "condition-button");
                }
            });
        } else if (button.textContent === "подача увлажненного кислорода") {
            button.addEventListener("click", (e) => {
                if (!button.classList.contains("mark-selected")) {
                    return;
                }
                let condition_button = document.querySelector(".condition-button.mark-selected");
                if (condition_button.textContent === "удовлетворительное") {
                    setButtonEnable("condition-middle-grave", "condition-button");
                }
            });
        }
    });
}


function addMindButtonsHandlers() {
    let buttons = document.querySelectorAll(".mind-button");
    buttons.forEach(button => {
        if (["дезориентирован", "не адекватен", "спутанное", "оглушение", "сопор", "кома"].includes(button.textContent)) {
            button.addEventListener("click", (e) => {
                if (!button.classList.contains("mark-selected")) {
                    return;
                }
                let condition_button = document.querySelector(".condition-button.mark-selected");
                if (["удовлетворительное"].includes(condition_button.textContent)) {
                    setButtonEnable("condition-grave", "condition-button");
                }
            });
        }
    });
}


function setTextareaScrolling(text_field_id) {
    let textarea = document.getElementById(text_field_id);
    textarea.addEventListener("scrollend", function () {
        textarea.rows++;
    });
}


function setButtonsHandlers(button_class, can_all_disabled = true) {
    let related_buttons = document.querySelectorAll(`.${button_class}`);
    related_buttons.forEach(button => {
        button.addEventListener("click", function () {
            if (BUTTONS_FEATURES[button_class] && BUTTONS_FEATURES[button_class]["text_field_id"]) {
                setTextFieldText(button, related_buttons, button_class);
            }
            toggleButton(button, related_buttons, can_all_disabled);
        });
    });
}


function setTextFieldText(toggled_button, related_buttons, button_class) {
    const text_field_id = BUTTONS_FEATURES[button_class]["text_field_id"];
    let text_field = document.getElementById(text_field_id);
    const buttons_values = BUTTONS_FEATURES[button_class]["values"];
    related_buttons.forEach(button => {
        if (button.classList.contains("mark-selected")) {
            text_field.value = text_field.value.replace(buttons_values[button.textContent], "");
        }
    });

    if (!toggled_button.classList.contains("mark-selected")) {
        text_field.value = buttons_values[toggled_button.textContent] + text_field.value;
    }
}


function toggleButton(toggled_button, related_buttons, can_all_disabled = true) {
    related_buttons.forEach(button => {
        if (button.classList.contains("mark-selected") && (button.textContent !== toggled_button.textContent)) {
            button.classList.remove("mark-selected");
        }
    });

    if (!toggled_button.classList.contains("mark-selected")) {
        toggled_button.classList.add("mark-selected");
    } else if (can_all_disabled) {
        toggled_button.classList.remove("mark-selected");
    }
}

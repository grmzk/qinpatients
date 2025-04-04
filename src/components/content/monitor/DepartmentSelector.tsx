import { DEPARTMENTS } from "../../../config/constants";
import { SyntheticEvent, useEffect } from "react";

interface IDepartmentChooserProps {
  departmentId: number;
  setDepartmentId: (departmentId: number) => void;
}

function DepartmentSelector({
  departmentId,
  setDepartmentId,
}: IDepartmentChooserProps) {
  useEffect(() => {
    const selectedDepartment = document.querySelector(
      `#DepartmentSelector .department[data-id="${departmentId}"]`,
    );
    selectedDepartment && selectedDepartment.classList.add("selected");
  }, [departmentId]);

  function selectDepartment(event: SyntheticEvent, id: number) {
    if (id === departmentId) {
      return;
    }
    const departments = document.querySelectorAll(
      "#DepartmentSelector .department",
    );
    for (const department of departments) {
      department.classList.remove("selected");
    }
    setDepartmentId(id);
  }

  return (
    <table id="DepartmentSelector" title="Выбор отделения">
      <tbody>
        {DEPARTMENTS.map((department, id) => (
          <tr
            className="department"
            key={id}
            data-id={id}
            onClick={(event) => selectDepartment(event, id)}
          >
            <td>{department}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DepartmentSelector;

import { useState } from "react";
import { useDisplayContext } from "../../../../context/DisplayContext";

import { useStudent } from "../../../../hooks/useStudent";
import DeleteModal from "../../modals/DeleteModal";
import StudentsTableRow from "./StudentsTableRow";
import { toast } from "react-toastify";
import { useDisplay } from "../../../../hooks/useDisplay";
import { DisplayType } from "../../../../models/DisplayType";
import { IStudentTable } from "../../../../models/TableModels";

interface IStudentsTableProps {
  students: IStudentTable[];
  isEditable: boolean;
}

const StudentsTable = ({ students, isEditable }: IStudentsTableProps) => {
  const [idToDelete, setIdToDelete] = useState("");
  const { deleteStudent } = useStudent();
  const { displayState } = useDisplayContext();
  const { displayManager } = useDisplay();

  const onDeleteStudent = async () => {
    try {
      await deleteStudent(idToDelete);
      toast.success("Student wasn deleted");
      displayManager(DisplayType.CLOSE_MODAL);
    } catch (error) {
      console.log(error);
      toast.error("Student wasn't deleted!");
    }
  };
  const onCloseModal = () => {
    setIdToDelete("");
    displayManager(DisplayType.CLOSE_MODAL);
  };

  return students.length > 0 ? (
    <div className="overflow-y-auto">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Student ID</th>
            <th className="px-4 py-2 border">First Name</th>
            <th className="px-4 py-2 border">Last Name</th>
            {!isEditable && (
              <th className="px-4 py-2 border">Prefix Phone Number</th>
            )}
            <th className="px-4 py-2 border">Phone Number</th>
            {isEditable && <th className="px-4 py-2 border">Delete</th>}
          </tr>
        </thead>
        <tbody>
          {students
            .sort((a, b) => Number(a.studentId) - Number(b.studentId))
            .map((student) => (
              <StudentsTableRow
                key={student.studentId}
                student={student}
                setIdToDelete={setIdToDelete}
                isEditable={isEditable}
              />
            ))}
        </tbody>
      </table>
      {displayState.showModal && (
        <DeleteModal onConfirm={onDeleteStudent} onClose={onCloseModal} />
      )}
    </div>
  ) : (
    isEditable && (
      <h2 className="text-2xl font-bold mt-6 text-center">
        There Are No Students
      </h2>
    )
  );
};

export default StudentsTable;

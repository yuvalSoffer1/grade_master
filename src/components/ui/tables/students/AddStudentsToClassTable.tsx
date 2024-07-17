import AddStudentsToClassTableRow from "./AddStudentsToClassTableRow";
import { IStudentResponse } from "../../../../models/StudentsResponses";

interface IAddStudentsToClassTableProps {
  students: IStudentResponse[];
  chosenStudentsIds: string[];
  onSelect: (studentId: string) => void;
}

const AddStudentsToClassTable = ({
  students,
  chosenStudentsIds,
  onSelect,
}: IAddStudentsToClassTableProps) => {
  return (
    <div className="overflow-y-auto">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Student ID</th>
            <th className="px-4 py-2 border">First Name</th>
            <th className="px-4 py-2 border">Last Name</th>
            <th className="px-4 py-2 border">Add</th>
          </tr>
        </thead>
        <tbody>
          {students
            .sort((a, b) => Number(a.studentId) - Number(b.studentId))
            .map((student) => (
              <AddStudentsToClassTableRow
                key={student.studentId}
                student={student}
                isChosen={chosenStudentsIds.includes(student.studentId)}
                onSelect={onSelect}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddStudentsToClassTable;

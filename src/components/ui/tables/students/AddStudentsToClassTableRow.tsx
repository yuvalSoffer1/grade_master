import { IconCirclePlusFilled, IconCircleXFilled } from "@tabler/icons-react";
import { IStudentResponse } from "../../../../models/StudentsResponses";

interface IStudentsTableRowProps {
  student: IStudentResponse;
  isChosen: boolean;
  onSelect: (studentId: string) => void;
}

const AddStudentsToClassTableRow = ({
  student,
  isChosen,
  onSelect,
}: IStudentsTableRowProps) => {
  return (
    <tr>
      <td className="px-4 py-2 text-center border">{student.studentId}</td>
      <td className="px-4 py-2 text-center border">{student.firstName}</td>
      <td className="px-4 py-2 text-center border">{student.lastName}</td>
      <td className="px-4 py-2 text-center border flex justify-center items-center">
        {isChosen ? (
          <IconCircleXFilled
            className="cursor-pointer text-red-500"
            onClick={() => onSelect(student.studentId)}
          />
        ) : (
          <IconCirclePlusFilled
            className="cursor-pointer text-green-700"
            onClick={() => onSelect(student.studentId)}
          />
        )}
      </td>
    </tr>
  );
};

export default AddStudentsToClassTableRow;

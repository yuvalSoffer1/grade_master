import { IconTrashFilled } from "@tabler/icons-react";

import { useDisplay } from "../../../../hooks/useDisplay";
import { DisplayType } from "../../../../models/DisplayType";
import { IStudentTable } from "../../../../models/TableModels";

interface IStudentsTableRowProps {
  student: IStudentTable;
  setIdToDelete: (id: string) => void;
  isEditable: boolean;
}

const StudentsTableRow = ({
  student,

  setIdToDelete,
  isEditable,
}: IStudentsTableRowProps) => {
  const { displayManager } = useDisplay();
  const onClickTrash = () => {
    setIdToDelete(student.studentId);
    displayManager(DisplayType.SHOW_MODAL);
  };

  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center border">{student.studentId}</td>
        <td className="px-4 py-2 text-center border">{student.firstName}</td>
        <td className="px-4 py-2 text-center border">{student.lastName}</td>
        {!isEditable && student.prefixPhoneNumber !== null && (
          <td className="px-4 py-2 text-center border">
            {student.prefixPhoneNumber}
          </td>
        )}
        <td className="px-4 py-2  text-center border">{student.phoneNumber}</td>
        {isEditable && (
          <td className="px-4 py-2  text-center border">
            <IconTrashFilled
              className=" cursor-pointer"
              onClick={onClickTrash}
            />
          </td>
        )}
      </tr>
    </>
  );
};

export default StudentsTableRow;

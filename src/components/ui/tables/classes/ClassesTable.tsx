import GenericTable from "../GenericTable";
import { IGetClassesResponse } from "../../../../models/ClassResponses";
import { useNavigate } from "react-router-dom";
import { useClass } from "../../../../hooks/useClass";

const ClassesTable = ({
  classes,
  isEditable,
}: {
  classes: IGetClassesResponse[];
  isEditable: boolean;
}) => {
  const columns: { header: string; accessor: keyof IGetClassesResponse }[] = [
    { header: "Class Name", accessor: "className" },
    { header: "Group Id", accessor: "groupId" },
    { header: "Amount of Students", accessor: "amountOfStudents" },
  ];

  const { deleteClass } = useClass();

  const navigate = useNavigate();

  const handleDeleteClass = async (id: string | number) => {
    if (typeof id === "number") {
      await deleteClass(id);
    } else {
      console.error("Expected number ID, but got string");
    }
  };

  return (
    <GenericTable<IGetClassesResponse>
      data={classes}
      columns={columns}
      isEditable={isEditable}
      actionHandler={(classId: number) => navigate(`/classes/${classId}`)}
      deleteHandler={handleDeleteClass}
      idAccessor="classId"
      itemName="Class"
    />
  );
};
export default ClassesTable;

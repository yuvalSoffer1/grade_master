import GenericTable from "../GenericTable";
import { IGetClassesResponse } from "../../../../models/ClassResponses";

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
  ];

  const handleDeleteStudent = async (id: string | number) => {
    if (typeof id === "number") {
      await console.log(id);
    } else {
      console.error("Expected number ID, but got string");
    }
  };

  return (
    <GenericTable<IGetClassesResponse>
      data={classes}
      columns={columns}
      isEditable={isEditable}
      deleteHandler={handleDeleteStudent}
      idAccessor="classId"
      itemName="Class"
    />
  );
};
export default ClassesTable;

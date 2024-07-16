import { IStudentTable } from "../../../../models/TableModels";
import { useStudent } from "../../../../hooks/useStudent";
import GenericTable from "../GenericTable";

const StudentsTable = ({
  students,
  isEditable,
}: {
  students: IStudentTable[];
  isEditable: boolean;
}) => {
  const { deleteStudent } = useStudent();

  const columns: { header: string; accessor: keyof IStudentTable }[] = [
    { header: "Student ID", accessor: "studentId" },
    { header: "First Name", accessor: "firstName" },
    { header: "Last Name", accessor: "lastName" },
    { header: "Phone Number", accessor: "phoneNumber" },
  ];

  const handleDeleteStudent = async (id: string | number) => {
    if (typeof id === "string") {
      await deleteStudent(id);
    } else {
      console.error("Expected string ID, but got number");
    }
  };

  return (
    <GenericTable<IStudentTable>
      data={students}
      columns={columns}
      isEditable={isEditable}
      deleteHandler={handleDeleteStudent}
      idAccessor="studentId"
      itemName="Student"
    />
  );
};

export default StudentsTable;

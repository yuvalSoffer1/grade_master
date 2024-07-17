import { useParams } from "react-router-dom";
import { useClassContext } from "../context/ClassContext";
import StudentsTable from "../components/ui/tables/students/StudentsTable";
import { IStudentTable } from "../models/TableModels";
import StyledButton from "../components/ui/StyledButton";
import { useState } from "react";
import AddStudentsToClassModal from "../components/ui/modals/AddStudentsToClassModal";
const ChosenClass = () => {
  const { classId } = useParams();
  const { classesState } = useClassContext();
  const [isOpen, setIsOpen] = useState(false);
  const id = classId ? parseInt(classId) : undefined;

  const selectedClass = classId
    ? classesState.classes.find((c) => c.classId === parseInt(classId))
    : undefined;

  const classStudentIds =
    selectedClass?.students?.map((student) => student.studentId) || [];

  return (
    <div className="flex flex-col items-center lg:h-89dvh xl:min-h-92dvh">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {`${selectedClass?.className} ${selectedClass?.groupId}`}
      </h2>
      <h3 className="text-xl font-bold mt-4 text-center">Students List</h3>
      {selectedClass?.students && selectedClass.students.length > 0 ? (
        <StudentsTable
          students={selectedClass.students as IStudentTable[]}
          isEditable={false}
        />
      ) : (
        <p>There are no students in the class</p>
      )}
      <StyledButton
        buttonType="button"
        text="Add Students"
        onClickButton={() => setIsOpen(true)}
        width="16.67%"
      />
      {isOpen && id && (
        <AddStudentsToClassModal
          classId={id}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          classStudentIds={classStudentIds}
        />
      )}
    </div>
  );
};

export default ChosenClass;

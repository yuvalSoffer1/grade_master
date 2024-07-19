import { useParams } from "react-router-dom";
import { useClassContext } from "../context/ClassContext";
import StudentsTable from "../components/ui/tables/students/StudentsTable";
import { IStudentTable } from "../models/TableModels";
import StyledButton from "../components/ui/StyledButton";
import { useEffect, useState } from "react";
import AddStudentsToClassModal from "../components/ui/modals/AddStudentsToClassModal";
import { useStudentContext } from "../context/StudentContext";
import { IStudentResponse } from "../models/StudentsResponses";
import { useStudent } from "../hooks/useStudent";
import { useClass } from "../hooks/useClass";
import {
  CreateAttendancePayload,
  CreateAttendancesReportPayload,
} from "../models/AttendancePayloads";
import {
  IGetAttendancesReportResponse,
  IStudentAttendances,
} from "../models/AttendanceResponses";
import AttendancesTable from "../components/ui/tables/classes/AttendancesTable";

const ChosenClass = () => {
  const { classId } = useParams();
  const { addStudentsToClass, createAttendanceReport, getAttendancesReport } =
    useClass();
  const [attendancesReport, setAttendancesReport] = useState<
    IStudentAttendances[]
  >([]);
  const [isAttendanceTableOpen, setIsAttendanceTableOpen] = useState(false);
  const { classesState } = useClassContext();
  const { studentsState } = useStudentContext();
  const { getAllStudents } = useStudent();
  const [availableStudents, setAvailableStudents] = useState<
    IStudentResponse[]
  >([]);
  const [currentDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const id = classId ? parseInt(classId) : undefined;

  const selectedClass = classId
    ? classesState.classes.find((c) => c.classId === parseInt(classId))
    : undefined;

  const onClickAdd = () => {
    const classStudentIds =
      selectedClass?.students?.map((student) => student.studentId) || [];
    const filteredStudents = studentsState.students.filter(
      (student) => !classStudentIds.includes(student.studentId)
    );
    setAvailableStudents(filteredStudents);
    setIsOpen(true);
  };

  const onAddStudents = async (studentsIds: string[]) => {
    if (id) await addStudentsToClass(id, studentsIds);
    return;
  };

  const onGetReport = async () => {
    if (id) {
      const result = await getAttendancesReport(id);
      setAttendancesReport(result);

      setIsAttendanceTableOpen(true);
    }
    return;
  };

  const onCreateReport = async (studentsIds: string[]) => {
    if (id && selectedClass?.students) {
      const allStudentsInClass =
        selectedClass?.students.map((student) => student.studentId) || [];
      const attendanceDtos: CreateAttendancePayload[] = allStudentsInClass.map(
        (studentId) => ({
          studentId,
          isPresent: studentsIds.includes(studentId),
        })
      );
      const newReport: CreateAttendancesReportPayload = {
        attendanceDtos,
        date: currentDate,
      };
      await createAttendanceReport(id, newReport); // Adjust this function to handle attendance report creation
    }
    return;
  };

  const getAllStudentsAsync = async () => {
    try {
      await getAllStudents();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (studentsState.students.length === 0) {
      getAllStudentsAsync();
    }
  }, []);

  return (
    <div className="flex flex-col items-center lg:h-89dvh xl:min-h-92dvh">
      <div className=" flex flex-row justify-between items-center">
        <h2 className="text-2xl font-bold text-center">
          {`${selectedClass?.className} ${selectedClass?.groupId}`}
        </h2>
        <StyledButton
          buttonType="button"
          text="Create Attendance Report"
          onClickButton={() => setIsReportOpen(true)}
          width="54%"
        />
      </div>
      <h3 className="text-xl font-bold mt-4 text-center">Students List</h3>

      {selectedClass?.students && selectedClass.students.length > 0 ? (
        <StudentsTable
          students={selectedClass.students as IStudentTable[]}
          isEditable={true}
          classId={id}
        />
      ) : (
        <p>There are no students in the class</p>
      )}
      <StyledButton
        buttonType="button"
        text="Add Students"
        onClickButton={onClickAdd}
        width="16.67%"
      />
      <StyledButton
        buttonType="button"
        text="Attendances Report"
        onClickButton={onGetReport}
        width="16.67%"
      />
      {isAttendanceTableOpen && attendancesReport !== undefined && (
        <AttendancesTable report={attendancesReport} isEditable={false} />
      )}
      {isOpen && id && (
        <AddStudentsToClassModal
          title="Add Students"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={onAddStudents}
          messageType="Students"
          availableStudents={availableStudents}
        />
      )}
      {isReportOpen && selectedClass?.students && (
        <AddStudentsToClassModal
          title={`Attendance Report: ${currentDate.toLocaleDateString()}`}
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          onConfirm={onCreateReport}
          messageType="Attendance Report"
          availableStudents={selectedClass?.students}
        />
      )}
    </div>
  );
};

export default ChosenClass;

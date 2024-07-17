import { useEffect, useState } from "react";
import { useStudentContext } from "../../../context/StudentContext";
import AddStudentsToClassTable from "../tables/students/AddStudentsToClassTable";
import { IStudentResponse } from "../../../models/StudentsResponses";
import { useStudent } from "../../../hooks/useStudent";
import { useClass } from "../../../hooks/useClass";
import { useDisplay, DisplayType } from "../../../hooks/useDisplay";
import { toast } from "react-toastify";

interface IAddStudentsModalProps {
  classId: number;
  isOpen: boolean;
  onClose: () => void;
  classStudentIds: string[]; // Array of student IDs in the specific class
}

const AddStudentsToClassModal = ({
  isOpen,
  onClose,
  classStudentIds,
  classId,
}: IAddStudentsModalProps) => {
  const { getAllStudents } = useStudent();
  const { studentsState } = useStudentContext();
  const { addStudentsToClass } = useClass();
  const { displayManager } = useDisplay();
  const [availableStudents, setAvailableStudents] = useState<
    IStudentResponse[]
  >([]);
  const [chosenStudentsIds, setChosenStudentsIds] = useState<string[]>([]);

  const onSelect = (studentId: string) => {
    setChosenStudentsIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const onConfirm = async () => {
    displayManager(DisplayType.START_LOADING);
    try {
      await addStudentsToClass(classId, chosenStudentsIds);
      toast.success("Students were added!");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Students weren't added!");
    } finally {
      displayManager(DisplayType.STOP_LOADING);
    }
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
    } else {
      // Filter available students whenever studentsState or classStudentIds change
      const filteredStudents = studentsState.students.filter(
        (student) => !classStudentIds.includes(student.studentId)
      );
      setAvailableStudents(filteredStudents);
    }
  }, [studentsState.students, classStudentIds]);

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-11/12 p-6">
        <h2 className="text-lg text-center font-semibold mb-4">Add Students</h2>
        <AddStudentsToClassTable
          students={availableStudents}
          chosenStudentsIds={chosenStudentsIds}
          onSelect={onSelect}
        />
        <div className="flex justify-center mt-5">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddStudentsToClassModal;

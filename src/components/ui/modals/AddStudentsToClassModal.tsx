import { useState } from "react";

import AddStudentsToClassTable from "../tables/students/AddStudentsToClassTable";
import { IStudentResponse } from "../../../models/StudentsResponses";

import { useDisplay, DisplayType } from "../../../hooks/useDisplay";
import { toast } from "react-toastify";

interface IAddStudentsModalProps {
  title: string;
  isOpen: boolean;
  availableStudents: IStudentResponse[];
  messageType: string;
  onClose: () => void;
  onConfirm: (ids: string[]) => void;
}

const AddStudentsToClassModal = ({
  title,
  isOpen,
  onClose,
  onConfirm,
  availableStudents,
  messageType,
}: IAddStudentsModalProps) => {
  const { displayManager } = useDisplay();

  const [chosenStudentsIds, setChosenStudentsIds] = useState<string[]>([]);

  const onSelect = (studentId: string) => {
    setChosenStudentsIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleConfirm = async () => {
    displayManager(DisplayType.START_LOADING);
    try {
      await onConfirm(chosenStudentsIds);
      toast.success(`${messageType} were added!`);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(`${messageType} weren't added!`);
    } finally {
      displayManager(DisplayType.STOP_LOADING);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-11/12 p-6">
        <h2 className="text-lg text-center font-semibold mb-4">{title}</h2>
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
            onClick={handleConfirm}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddStudentsToClassModal;

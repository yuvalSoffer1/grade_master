import { useState } from "react";

import StudentsAtClass from "../tables/students/StudentsAtClassTable";
import { IStudentResponse } from "../../../models/StudentsResponses";

import { useDisplay, DisplayType } from "../../../hooks/useDisplay";
import { toast } from "react-toastify";
import { IStudentAttendancesResponse } from "../../../models/AttendanceResponses";
import AttendancesTable from "../tables/classes/AttendancesTable";
import StyledButton from "../buttons/StyledButton";
import { exportToCSV } from "../../../utils/exportToCsv";
import ExportToCsvButton from "../buttons/ExportToCsvButton";

interface IStudentsAtClassModalProps {
  title: string;
  isOpen: boolean;
  availableData: IStudentResponse[] | IStudentAttendancesResponse[];
  messageType: string;
  onClose: () => void;
  onConfirm: (ids: string[]) => void;
}

const StudentsAtClassModal = ({
  title,
  isOpen,
  onClose,
  onConfirm,
  availableData,
  messageType,
}: IStudentsAtClassModalProps) => {
  const { displayManager } = useDisplay();

  const [chosenStudentsIds, setChosenStudentsIds] = useState<string[]>([]);

  const onSelect = (studentId: string) => {
    setChosenStudentsIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const isStudentResponse = (data: any): data is IStudentResponse => {
    return "phoneNumber" in data;
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

  const handleExport = () => {
    if (!isStudentResponse(availableData[0])) {
      exportToCSV(
        availableData as IStudentAttendancesResponse[],
        `${title.replace(" ", "_").toLowerCase()}_students.csv`
      );
    }
    return;
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-11/12 p-6">
        <h2 className="text-lg text-center font-semibold mb-4">{title}</h2>
        {isStudentResponse(availableData[0]) ? (
          <StudentsAtClass
            students={availableData as IStudentResponse[]}
            chosenStudentsIds={chosenStudentsIds}
            onSelect={onSelect}
          />
        ) : (
          <div className="flex flex-col items-center">
            <ExportToCsvButton onExport={handleExport} />
            <AttendancesTable
              report={availableData as IStudentAttendancesResponse[]}
            />
          </div>
        )}
        <div className="flex justify-center mt-5">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          {isStudentResponse(availableData[0]) && (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleConfirm}
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default StudentsAtClassModal;

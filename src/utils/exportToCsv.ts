import Papa from "papaparse";
import { IStudentResponse } from "../models/StudentsResponses";
import { IGetClassesResponse } from "../models/ClassResponses";
import { IStudentAttendancesResponse } from "../models/AttendanceResponses";
import { studentHeaders } from "../data/toCsvTablesHeaders";
import { formatDate } from "./dateUtils";

type DataToCsv =
  | IStudentResponse[]
  | IGetClassesResponse[]
  | IStudentAttendancesResponse[];

export const exportToCSV = (data: DataToCsv, filename: string): void => {
  let csv;
  let formattedData;

  if (isStudentResponseArray(data)) {
    formattedData = formattedDataStudent(data);
    csv = Papa.unparse({
      fields: studentHeaders.reverse(),
      data: formattedData.map((student) =>
        [
          student.studentId,
          student.firstName,
          student.lastName,
          student.phoneNumber,
        ].reverse()
      ),
    });
  } else if (isAttendanceResponseArray(data)) {
    return;
  } else {
    csv = Papa.unparse(data);
  }

  fileDownloader(csv, filename);
};

const isStudentResponseArray = (data: any): data is IStudentResponse[] => {
  return Array.isArray(data) && data.length > 0 && "studentId" in data[0];
};

const isAttendanceResponseArray = (
  data: any
): data is IStudentAttendancesResponse[] => {
  return Array.isArray(data) && data.length > 0 && "attendanceDates" in data[0];
};

const formattedDataStudent = (data: IStudentResponse[]) => {
  return data.map((student) => ({
    ...student,
    phoneNumber: `'${student.phoneNumber}'`,
  }));
};

const formattedDataAttendances = (responses: IStudentAttendancesResponse[]) => {
  return responses.map((response) => {
    const { attendanceDates, ...rest } = response;

    // Create a new object with formatted date keys
    const formattedAttendanceDates = Object.keys(attendanceDates).reduce(
      (acc, dateKey) => {
        const formattedKey = formatDate(dateKey);

        // Ensure the value is boolean
        const value = attendanceDates[dateKey];
        if (typeof value === "boolean") {
          acc[formattedKey] = value;
        } else {
          // Handle unexpected types if necessary
          console.warn(`Unexpected type for key ${dateKey}:`, typeof value);
        }

        return acc;
      },
      {} as Record<string, boolean>
    );

    return {
      ...rest,
      ...formattedAttendanceDates,
    };
  });
};

const fileDownloader = (csvData: string, fileName: string) => {
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

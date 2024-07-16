import Papa from "papaparse";
import { IStudentResponse } from "../models/StudentsResponses";
import { IGetClassesResponse } from "../models/ClassResponses";

type DataToCsv = IStudentResponse[] | IGetClassesResponse[];

export const exportToCSV = (data: DataToCsv, filename: string): void => {
  let csv;
  let formattedData;
  if (isStudentResponseArray(data)) {
    formattedData = formattedDataStudent(data);
    csv = Papa.unparse(formattedData);
    fileDownloader(csv, filename);
    return;
  }

  csv = Papa.unparse(data);
  fileDownloader(csv, filename);
};

const isStudentResponseArray = (data: any): data is IStudentResponse[] => {
  return Array.isArray(data) && data.length > 0 && "studentId" in data[0];
};

const formattedDataStudent = (data: IStudentResponse[]) => {
  return data.map((student) => ({
    ...student,
    phoneNumber: `'${student.phoneNumber}'`,
  }));
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

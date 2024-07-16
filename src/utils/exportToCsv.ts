import Papa from "papaparse";
import { IStudentResponse } from "../models/StudentsResponses";

export const exportToCSV = (
  data: IStudentResponse[],
  filename: string
): void => {
  const formattedData = data.map((item) => ({
    ...item,
    phoneNumber: `'${item.phoneNumber}'`,
  }));

  const csv = Papa.unparse(formattedData);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

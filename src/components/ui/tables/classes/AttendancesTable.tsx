import Papa from "papaparse";
import { IStudentAttendancesResponse } from "../../../../models/class/AttendanceResponses";
import { formatDate } from "../../../../utils/dateUtils";
import ExportToCsvButton from "../../buttons/ExportToCsvButton";

interface IAttendancesTableProps {
  report: IStudentAttendancesResponse[];
  fileName: string;
}

const AttendancesTable = ({ report, fileName }: IAttendancesTableProps) => {
  const handleExport = () => {
    if (report.length === 0) return;

    // Prepare the CSV headers
    const headers = [
      "Student ID",
      "First Name",
      "Last Name",
      ...Object.keys(report[0].attendanceDates).map((date) => formatDate(date)),
      "Total Attendances",
      "Total Lectures",
    ].reverse();

    // Prepare the CSV data
    const csvData = report.map((student) => {
      return [
        student.studentId,
        student.firstName,
        student.lastName,
        ...Object.values(student.attendanceDates),
        student.totalAttendances,
        student.totalLectures,
      ].reverse();
    });
    // Add headers to CSV data
    csvData.unshift(headers);

    // Convert to CSV string
    const csvString = Papa.unparse(csvData);

    // Create a blob from the CSV string and trigger download
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="overflow-y-auto overflow-x-auto">
      <div className="flex justify-center">
        <ExportToCsvButton onExport={handleExport} />
      </div>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Student ID</th>
            <th className="px-4 py-2 border">First Name</th>
            <th className="px-4 py-2 border">Last Name</th>
            {Object.entries(report[0].attendanceDates).map(([date]) => (
              <th key={date} className="px-4 py-2 border">
                {formatDate(date)}
              </th>
            ))}
            <th className="px-4 py-2 border">Total Attendances</th>
            <th className="px-4 py-2 border">Total Lectures</th>
          </tr>
        </thead>
        <tbody>
          {report.map((student) => (
            <tr key={student.studentId}>
              <td className="px-4 py-2 text-center border">
                {student.studentId}
              </td>
              <td className="px-4 py-2 text-center border">
                {student.firstName}
              </td>
              <td className="px-4 py-2 text-center border">
                {student.lastName}
              </td>
              {Object.entries(student.attendanceDates).map(([date, value]) => (
                <td key={date} className="px-4 py-2 text-center border">
                  {value}
                </td>
              ))}
              <td className="px-4 py-2 text-center border">
                {student.totalAttendances}
              </td>
              <td className="px-4 py-2 text-center border">
                {student.totalLectures}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancesTable;

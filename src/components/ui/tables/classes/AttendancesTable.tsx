import { IStudentAttendances } from "../../../../models/AttendanceResponses";

const AttendancesTable = ({ report }: { report: IStudentAttendances[] }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  return (
    <div className="overflow-y-auto overflow-x-auto">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancesTable;

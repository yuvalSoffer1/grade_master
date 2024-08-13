import Papa from "papaparse";
import { IFinalGradeResponse } from "../../../../models/grades/FinalGradesResponses";
import ExportToCsvButton from "../../buttons/ExportToCsvButton";

interface IFinalGradeTableProps {
  data: IFinalGradeResponse;
}

const FinalGradesTable = ({ data }: IFinalGradeTableProps) => {
  const handleExport = () => {
    // Prepare the CSV data
    const csvData = [];
    const headers = [
      "Student ID",
      "Student Name",
      ...data.students[0].grades.map(
        (grade) => `${grade.name} (${grade.weight * 100}%)`
      ),
      "Final Grade",
    ].reverse();
    csvData.push(headers);

    // Loop through each student and add their data
    data.students.forEach((student) => {
      const row = [
        student.studentId,
        student.studentName,
        ...student.grades.map((grade) => grade.score),
        student.finalGrade,
      ].reverse();
      csvData.push(row);
    });

    // Add class average as the last row
    const classAverageRow = [
      "", // Empty for Student ID
      "Class Average",
      ...new Array(data.students[0].grades.length).fill(""), // Empty cells for grades
      data.classAverage,
    ].reverse();
    csvData.push(classAverageRow);

    // Convert to CSV string
    const csvString = Papa.unparse(csvData);

    // Create a blob from the CSV string and trigger download
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${data.className}-grades-report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="overflow-y-auto overflow-x-auto">
      <div className="flex flex-row text-center mt-10 justify-center">
        <h3 className="text-xl ">FINAL GRADES</h3>
        <ExportToCsvButton onExport={handleExport} />
      </div>

      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Student ID</th>
            <th className="px-4 py-2 border">Student Name</th>
            {data.students[0].grades.map((grade) => (
              <th key={grade.name} className="px-4 py-2 border">
                {grade.name} ({grade.weight * 100}%)
              </th>
            ))}
            <th className="px-4 py-2 border">Final Grade</th>
          </tr>
        </thead>
        <tbody>
          {data.students.map((student) => (
            <tr key={student.studentId}>
              <td className="px-4 py-2 text-center border">
                {student.studentId}
              </td>
              <td className="px-4 py-2 text-center border">
                {student.studentName}
              </td>
              {student.grades.map((grade) => (
                <td key={grade.name} className="px-4 py-2 text-center border">
                  {grade.score}
                </td>
              ))}
              <td className="px-4 py-2 text-center border">
                {student.finalGrade}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-center">
        <span className="font-semibold">Class Average:</span>{" "}
        {data.classAverage}
      </div>
    </div>
  );
};

export default FinalGradesTable;

import { IFinalGradeResponse } from "../../../../models/grades/FinalGradesResponses";
import ExportToCsvButton from "../../buttons/ExportToCsvButton";
import { exportFinalGradesReport } from "../../../../utils/exportToCsv";

interface IFinalGradeTableProps {
  data: IFinalGradeResponse;
}

const FinalGradesTable = ({ data }: IFinalGradeTableProps) => {
  return (
    <div className="overflow-y-auto overflow-x-auto">
      <div className="flex flex-row text-center mt-10 justify-center">
        <h3 className="text-xl ">FINAL GRADES</h3>
        <ExportToCsvButton
          onExport={() =>
            exportFinalGradesReport(data, `${data.className}-grades-report.csv`)
          }
        />
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
      {data.classAverage >= 0 && (
        <div className="mt-4 text-center">
          <span className="font-semibold">Class Average:</span>{" "}
          {data.classAverage}
        </div>
      )}
    </div>
  );
};

export default FinalGradesTable;

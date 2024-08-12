import { IStudentResponse } from "./StudentsResponses";

export interface IStudentTable extends IStudentResponse {
  prefixPhoneNumber: string | null;
}

export interface IGradesTable<T> {
  studentId: string;
  gradeItemNames: T;
}

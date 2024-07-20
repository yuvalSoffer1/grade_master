import { IStudentResponse } from "./StudentsResponses";

export interface IGetClassesResponse {
  classId: number;
  className: string;
  groupId: number;
  amountOfStudents: number;
  students: IStudentResponse[] | null;
}

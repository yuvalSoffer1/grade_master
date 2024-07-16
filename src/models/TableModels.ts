import { IStudentResponse } from "./StudentsResponses";

export interface IStudentTable extends IStudentResponse {
  prefixPhoneNumber: string | null;
}

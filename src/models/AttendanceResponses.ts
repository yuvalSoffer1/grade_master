interface IAttendanceDates {
  [date: string]: string;
}
export interface IStudentAttendances {
  studentId: string;
  firstName: string;
  lastName: string;
  attendanceDates: IAttendanceDates;
  totalAttendances: number;
}

export interface IGetAttendancesReportResponse {
  AllAttendances: IStudentAttendances[];
}

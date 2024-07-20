import React, { createContext, useReducer, useContext, Dispatch } from "react";

import { IGetClassesResponse } from "../models/ClassResponses";
import { IStudentResponse } from "../models/StudentsResponses";

type ClassAction =
  | { type: "GET_ALL_SUCCESS"; payload: IGetClassesResponse[] }
  | { type: "CREATE_SUCCESS"; payload: IGetClassesResponse }
  | { type: "DELETE_SUCCESS"; payload: { classId: number } }
  | {
      type: "ADD_STUDENTS_SUCCESS";
      payload: { classId: number; students: IStudentResponse[] };
    }
  | {
      type: "REMOVE_STUDENT_SUCCESS";
      payload: { classId: number; studentId: string };
    };

interface ClassState {
  classes: IGetClassesResponse[] | [];
}

const initialState: ClassState = {
  classes: [],
};

const ClassContext = createContext<
  | {
      classesState: ClassState;
      classDispatch: Dispatch<ClassAction>;
    }
  | undefined
>(undefined);

const classReducer = (state: ClassState, action: ClassAction): ClassState => {
  switch (action.type) {
    case "GET_ALL_SUCCESS":
      return {
        classes: action.payload,
      };

    case "CREATE_SUCCESS": {
      const newClass = action.payload;
      return {
        classes: state.classes ? [...state.classes, newClass] : [newClass],
      };
    }

    case "DELETE_SUCCESS":
      return {
        classes: state.classes
          ? state.classes.filter((c) => c.classId !== action.payload.classId)
          : [],
      };
    case "ADD_STUDENTS_SUCCESS": {
      const { classId, students } = action.payload;
      return {
        classes: state.classes.map((c) =>
          c.classId === classId
            ? { ...c, students: [...(c.students ?? []), ...students] }
            : c
        ),
      };
    }
    case "REMOVE_STUDENT_SUCCESS": {
      const { classId, studentId } = action.payload;
      return {
        classes: state.classes.map((c) =>
          c.classId === classId
            ? {
                ...c,
                students: (c.students ?? []).filter(
                  (s) => s.studentId !== studentId
                ),
              }
            : c
        ),
      };
    }

    default:
      return state;
  }
};

export const ClassProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [classesState, classDispatch] = useReducer(classReducer, initialState);

  return (
    <ClassContext.Provider value={{ classesState, classDispatch }}>
      {children}
    </ClassContext.Provider>
  );
};

export const useClassContext = () => {
  const context = useContext(ClassContext);

  if (context === undefined) {
    throw new Error("useClassContext must be used within a ClassProvider");
  }

  return context;
};

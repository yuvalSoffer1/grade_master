import React, { useEffect, useRef, useState } from "react";
import { useStudent } from "../hooks/useStudent";
import StudentsTable from "../components/ui/tables/students/StudentsTable";
import AddStudentCard from "../components/ui/cards/students/AddStudentCard";
import AddStudentsFromCsv from "../components/ui/csvs/AddStudentsFromCsv";
import { useStudentContext } from "../context/StudentContext";
import StyledButton from "../components/ui/StyledButton";
import { IStudentResponse } from "../models/StudentsResponses";
import { IStudentTable } from "../models/TableModels";

const Students = () => {
  const { getAllStudents } = useStudent();
  const isEffectRan = useRef(false);
  const [selectedDisplay, setSelectedDisplay] = useState("");
  const { studentsState } = useStudentContext();
  const { students } = studentsState;

  const [isLoading, setIsLoading] = useState(false);

  const getAllStudentsAsync = async () => {
    try {
      await getAllStudents();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!isEffectRan.current) {
      getAllStudentsAsync();
    }
    return () => {
      isEffectRan.current = true;
    };
  }, []);

  return (
    <div className=" flex flex-col items-center text-center">
      {selectedDisplay === "" && (
        <>
          <StudentsTable
            students={students as IStudentTable[]}
            isEditable={true}
          />
          <StyledButton
            buttonType="button"
            text="Add Students"
            onClickButton={() => setSelectedDisplay("Add")}
            width="16.67%"
          />
        </>
      )}
      {selectedDisplay === "Add" && (
        <>
          <StyledButton
            buttonType="button"
            text="Add Students Manually"
            onClickButton={() => setSelectedDisplay("Manually")}
            width="16.67%"
          />
          <StyledButton
            buttonType="button"
            text="Add Students From CSV"
            onClickButton={() => setSelectedDisplay("CSV")}
            width="16.67%"
          />
        </>
      )}
      {selectedDisplay === "Manually" && (
        <AddStudentCard
          setIsLoading={setIsLoading}
          setSelectedDisplay={setSelectedDisplay}
        />
      )}
      {selectedDisplay === "CSV" && <AddStudentsFromCsv />}
    </div>
  );
};

export default Students;

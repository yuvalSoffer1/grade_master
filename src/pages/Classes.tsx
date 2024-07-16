import { useEffect, useRef, useState } from "react";

import ClassesTable from "../components/ui/tables/classes/ClassesTable";

import StyledButton from "../components/ui/StyledButton";
import { exportToCSV } from "../utils/exportToCsv";
import { useClass } from "../hooks/useClass";
import { useClassContext } from "../context/ClassContext";
import AddClassCard from "../components/ui/cards/classes/AddClassCard";

const Classes = () => {
  const { getAllClasses } = useClass();
  const isEffectRan = useRef(false);
  const [selectedDisplay, setSelectedDisplay] = useState("");
  const { classesState } = useClassContext();
  const { classes } = classesState;
  const handleExport = () => {
    exportToCSV(classes, "classes.csv");
  };

  const [isLoading, setIsLoading] = useState(false);

  const getAllClassesAsync = async () => {
    try {
      await getAllClasses();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!isEffectRan.current) {
      getAllClassesAsync();
    }
    return () => {
      isEffectRan.current = true;
    };
  }, []);

  return (
    <div className=" flex flex-col items-center text-center">
      {selectedDisplay === "" && (
        <>
          <StyledButton
            buttonType="button"
            text="Export To Csv"
            onClickButton={handleExport}
            extraColor="green"
            width="15%"
          />
          <ClassesTable classes={classes} isEditable={true} />
          <StyledButton
            buttonType="button"
            text="Add Classes"
            onClickButton={() => setSelectedDisplay("Add")}
            width="16.67%"
          />
        </>
      )}
      {selectedDisplay === "Add" && (
        <AddClassCard setSelectedDisplay={setSelectedDisplay} />
      )}

      {selectedDisplay !== "" && (
        <StyledButton
          buttonType="button"
          text="Return"
          onClickButton={() => setSelectedDisplay("")}
          width="25%"
          extraColor="red"
        />
      )}
    </div>
  );
};

export default Classes;

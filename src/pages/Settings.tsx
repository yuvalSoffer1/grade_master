import React, { useEffect, useRef } from "react";
import { useClass } from "../hooks/useClass";
import { useClassContext } from "../context/ClassContext";
import ClassesTable from "../components/ui/tables/classes/ClassesTable";

const Settings = () => {
  const { getAllClasses } = useClass();
  const isEffectRan = useRef(false);

  const { classesState } = useClassContext();
  const { classes } = classesState;

  const getAllClassesAsync = async () => {
    try {
      await getAllClasses();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(
    () => {
      if (!isEffectRan.current) {
        getAllClassesAsync();
      }
      return () => {
        isEffectRan.current = true;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <div className=" flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold mb-3 text-center">Settings</h2>
      <h3 className="text-xl mb-3 text-center">My Classes</h3>
      <ClassesTable classes={classes} isEditable={true} toNavigate="settings" />
    </div>
  );
};

export default Settings;

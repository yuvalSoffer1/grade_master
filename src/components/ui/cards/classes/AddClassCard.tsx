import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useClass } from "../../../../hooks/useClass";
import { toast } from "react-toastify";
import { addClassValidationRules } from "../../../../utils/validationRules";
import GenericForm from "../../../../components/ui/cards/GenericForm";
import { CreateClassPayload } from "../../../../models/ClassPayloads";
import { useDisplay } from "../../../../hooks/useDisplay";
import { DisplayType } from "../../../../models/DisplayType";

interface IAddClassCardProps {
  setSelectedDisplay: (value: string) => void;
}

const AddClassCard = ({ setSelectedDisplay }: IAddClassCardProps) => {
  const { createClass } = useClass();
  const { displayManager } = useDisplay();

  const onSubmit: SubmitHandler<CreateClassPayload> = async (data) => {
    displayManager(DisplayType.START_LOADING);
    try {
      await createClass(data);
      toast.success("Class was created");
      setSelectedDisplay("");
    } catch (error) {
      toast.error("Class wasn't created!");
    } finally {
      displayManager(DisplayType.STOP_LOADING);
    }
  };

  const fields = [
    {
      name: "className",
      type: "text",
      placeholder: "Class Name",
      validation: addClassValidationRules.className,
    },
    {
      name: "groupId",
      type: "number",
      placeholder: "1",
      validation: addClassValidationRules.groupId,
    },
  ];

  return (
    <div className="flex items-center justify-center text-left w-2/3 ">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-400 ">
        <h2 className="text-2xl font-bold mb-3 text-center">Add Class</h2>
        <GenericForm fields={fields} onSubmit={onSubmit} buttonText="Add" />
      </div>
    </div>
  );
};

export default AddClassCard;

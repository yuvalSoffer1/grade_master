import { useForm } from "react-hook-form";
import { CreateClassPayload } from "../../../../models/ClassPayloads";
import { useClass } from "../../../../hooks/useClass";
import { toast } from "react-toastify";

interface IAddClassCardProps {
  setSelectedDisplay: (value: string) => void;
}
const AddClassCard = ({ setSelectedDisplay }: IAddClassCardProps) => {
  const { createClass } = useClass();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClassPayload>();

  const onSubmit = async (data: CreateClassPayload) => {
    try {
      await createClass(data);
      toast.success("Class was created");
      setSelectedDisplay("");
    } catch (error) {
      toast.error("Class wasn't created!");
    }
  };

  const validationRules = {
    className: {
      required: "Class Name is required",
    },
    groupId: {
      required: "Group ID is required",
    },
  };
  return (
    <div className="flex items-center justify-center text-left w-2/3 ">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-400 ">
        <h2 className="text-2xl font-bold mb-3 text-center">Add Student</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3"></div>
          <div className="mb-3">
            <label
              htmlFor="className"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Class Name
            </label>
            <input
              type="text"
              id="className"
              placeholder="Class Name"
              {...register("className", validationRules.className)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.className && (
              <span className="text-red-600">{errors.className.message}</span>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="groupId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Group ID
            </label>
            <input
              type="number"
              id="groupId"
              placeholder="1"
              min={1}
              {...register("groupId", validationRules.groupId)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.groupId && (
              <span className="text-red-600">{errors.groupId.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClassCard;

import { useForm } from "react-hook-form";
import { CreateStudentPayload } from "../../../../models/StudentsPayloads";
import { useStudent } from "../../../../hooks/useStudent";
import { toast } from "react-toastify";

interface IAddStudentCardProps {
  setIsLoading: (value: boolean) => void;
  setSelectedDisplay: (value: string) => void;
}

const AddStudentCard = ({
  setIsLoading,
  setSelectedDisplay,
}: IAddStudentCardProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStudentPayload>();

  const { createStudent } = useStudent();

  const onSubmit = async (data: CreateStudentPayload) => {
    setIsLoading(true);
    try {
      await createStudent(data);

      toast.success("Student was created");
      setSelectedDisplay("");
    } catch (error) {
      toast.error("Student wasn't created!");
    } finally {
      setIsLoading(false);
    }
  };

  const validationRules = {
    studentId: {
      required: "Student ID is required",
      pattern: {
        value: /^[0-9]{6}$/,
        message: "Student ID must be a numeric string of 6 digits",
      },
    },
    firstName: {
      required: "First Name is required",
    },
    lastName: {
      required: "Last Name is required",
    },
    prefixPhoneNumber: {
      pattern: {
        value: /^0\d{1,2}$/,
        message:
          "Prefix must be numeric, start with 0, and be 2 to 3 digits long",
      },
    },
    phoneNumber: {
      pattern: {
        value: /^\d{7}$/,
        message: "Phone number must be exactly 7 digits",
      },
    },
  };

  return (
    <div className="flex items-center justify-center text-left w-2/3 ">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-400 ">
        <h2 className="text-2xl font-bold mb-3 text-center">Add Student</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label
              htmlFor="studentId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              placeholder="123456"
              {...register("studentId", validationRules.studentId)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.studentId && (
              <span className="text-red-600">{errors.studentId.message}</span>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              {...register("firstName", validationRules.firstName)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.firstName && (
              <span className="text-red-600">{errors.firstName.message}</span>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              {...register("lastName", validationRules.lastName)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.lastName && (
              <span className="text-red-600">{errors.lastName.message}</span>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="prefix"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Prefix Phone Number
            </label>
            <input
              type="text"
              id="prefix"
              placeholder="052"
              {...register(
                "prefixPhoneNumber",
                validationRules.prefixPhoneNumber
              )}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.prefixPhoneNumber && (
              <span className="text-red-600">
                {errors.prefixPhoneNumber.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="3456789"
              {...register("phoneNumber", validationRules.phoneNumber)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phoneNumber && (
              <span className="text-red-600">{errors.phoneNumber.message}</span>
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

export default AddStudentCard;

import { dotnetApi } from "../api/apiConfig";
import { useClassContext } from "../context/ClassContext";
import { CreateClassPayload } from "../models/ClassPayloads";
import { IGetClassesResponse } from "../models/ClassResponses";
import { axiosErrorExtractor } from "../utils/axiosErrorUtils";

export const useClass = () => {
  const { classDispatch } = useClassContext();

  const getAllClasses = async () => {
    try {
      const res = await dotnetApi.get("classes/my-classes");
      const data: IGetClassesResponse[] = res.data;
      classDispatch({ type: "GET_ALL_SUCCESS", payload: data });
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };
  const createClass = async (classDetails: CreateClassPayload) => {
    try {
      const res = await dotnetApi.post("classes/add", classDetails);
      const newClass: IGetClassesResponse = res.data;
      classDispatch({ type: "CREATE_SUCCESS", payload: newClass });
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };

  /* const deleteClass = async (classId: number) => {
    try {
      await dotnetApi.delete(`classes/add/${classId}`);

      classDispatch({
        type: "DELETE_SUCCESS",
        payload: { classId: classId },
      });
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };*/
  return {
    getAllClasses,
    createClass,
  };
};

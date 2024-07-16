import { useState } from "react";
import { useDisplayContext } from "../../../context/DisplayContext";
import DeleteModal from "../modals/DeleteModal";
import { toast } from "react-toastify";
import { useDisplay } from "../../../hooks/useDisplay";
import { DisplayType } from "../../../models/DisplayType";
import { IconTrashFilled } from "@tabler/icons-react";

interface IGenericTableProps<T> {
  data: T[];
  columns: { header: string; accessor: keyof T }[];
  isEditable: boolean;
  deleteHandler?: (id: string | number) => Promise<void>;
  itemName?: string;
  idAccessor: keyof T;
}

const GenericTable = <T extends { [key: string]: any }>({
  data,
  columns,
  isEditable,
  deleteHandler,
  itemName,
  idAccessor,
}: IGenericTableProps<T>) => {
  const [idToDelete, setIdToDelete] = useState<string | number | null>(null);
  const { displayState } = useDisplayContext();
  const { displayManager } = useDisplay();

  const onDeleteItem = async () => {
    if (deleteHandler && idToDelete !== null) {
      try {
        await deleteHandler(idToDelete);
        toast.success(`${itemName} was deleted`);
        displayManager(DisplayType.CLOSE_MODAL);
      } catch (error) {
        console.error(error);
        toast.error(`${itemName}wasn't deleted!`);
      }
    }
  };

  const onCloseModal = () => {
    setIdToDelete(null);
    displayManager(DisplayType.CLOSE_MODAL);
  };

  return data.length > 0 ? (
    <div className="overflow-y-auto">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.accessor)} className="px-4 py-2 border">
                {column.header}
              </th>
            ))}
            {isEditable && deleteHandler && (
              <th className="px-4 py-2 border">Delete</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item[idAccessor]}>
              {columns.map((column) => (
                <td
                  key={String(column.accessor)}
                  className="px-4 py-2 text-center border"
                >
                  {item[column.accessor]}
                </td>
              ))}
              {isEditable && deleteHandler && (
                <td className="px-4 py-2 text-center border">
                  <IconTrashFilled
                    className="cursor-pointer"
                    onClick={() => {
                      setIdToDelete(item[idAccessor] as string | number);
                      displayManager(DisplayType.SHOW_MODAL);
                    }}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {displayState.showModal && isEditable && (
        <DeleteModal
          onConfirm={onDeleteItem}
          onClose={onCloseModal}
          itemName={itemName}
        />
      )}
    </div>
  ) : (
    isEditable && (
      <h2 className="text-2xl font-bold mt-6 text-center">
        There Are No {itemName}s
      </h2>
    )
  );
};

export default GenericTable;

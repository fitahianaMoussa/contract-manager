import { Age, ColumnsProps, User } from "@/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export const useAgeColumns = (
    props: ColumnsProps<Age> & { user: User },
): ColumnDef<Age>[] => {
    return useMemo(() => {
        return [
            {
                accessorKey: "value",
                header: "Age",
                cell: (info) => info.getValue(),
            },
            {
                accessorFn: (row) => row,
                header: "Actions",
                cell: (info) => (
                    <div className="flex space-x-2">
                        {(props.user.role === "ROLE_ADMIN" ||
                            props.user.id ===
                                (info.getValue() as Age).broker.id) && (
                            <>
                                <button
                                    onClick={(event: any) => {
                                        event.preventDefault();
                                        props.onEdit(info.getValue() as Age);
                                    }}
                                    className={
                                        "p-1 border border-transparent rounded-md"
                                    }
                                >
                                    <PencilIcon className="w-5 h-5 text-green-600" />
                                </button>
                                <button
                                    onClick={(event: any) => {
                                        event.preventDefault();
                                        props.onDelete(info.getValue() as Age);
                                    }}
                                    className={
                                        "p-1 border border-transparent rounded-md"
                                    }
                                >
                                    <TrashIcon className="w-5 h-5 text-red-600" />
                                </button>
                            </>
                        )}
                        {props.user.role === "ROLE_ADMIN" &&
                            props.user.id !==
                                (info.getValue() as Age).broker.id && (
                                <div className="truncate text-gray-500">
                                    (
                                    {(info.getValue() as Age).broker.first_name}{" "}
                                    {(info.getValue() as Age).broker.last_name})
                                </div>
                            )}
                    </div>
                ),
            },
        ];
    }, []);
};

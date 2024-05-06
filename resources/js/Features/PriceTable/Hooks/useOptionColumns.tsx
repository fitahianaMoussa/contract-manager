import { ColumnsProps, Option, User } from "@/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export const useOptionColumns = (
    props: ColumnsProps<Option> & { user: User },
): ColumnDef<Option>[] => {
    return useMemo(() => {
        return [
            {
                accessorKey: "name",
                header: () => "Option",
                cell: (info) => info.getValue(),
            },
            {
                accessorFn: (row) => row,
                header: "Actions",
                cell: (info) => (
                    <div className="flex space-x-2">
                        {(props.user.role === "ROLE_ADMIN" ||
                            props.user.id ===
                                (info.getValue() as Option).broker.id) && (
                            <>
                                <button
                                    onClick={(event: any) => {
                                        event.preventDefault();
                                        props.onEdit(info.getValue() as Option);
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
                                        props.onDelete(
                                            info.getValue() as Option,
                                        );
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
                                (info.getValue() as Option).broker.id && (
                                <div className="truncate text-gray-500">
                                    (
                                    {
                                        (info.getValue() as Option).broker
                                            .first_name
                                    }{" "}
                                    {
                                        (info.getValue() as Option).broker
                                            .last_name
                                    }
                                    )
                                </div>
                            )}
                    </div>
                ),
            },
        ];
    }, []);
};

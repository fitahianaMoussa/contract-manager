import { ColumnsProps, Location, User } from "@/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export const useLocationColumns = (
    props: ColumnsProps<Location> & { user: User },
): ColumnDef<Location>[] => {
    return useMemo(() => {
        return [
            {
                accessorKey: "name",
                header: "Location",
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: "country",
                header: "Pays",
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: "zip_code",
                header: "Code Postal",
                cell: (info) => info.getValue(),
            },
            {
                accessorFn: (row) => row,
                header: "Actions",
                cell: (info) => (
                    <div className="flex space-x-2">
                        {(props.user.role === "ROLE_ADMIN" ||
                            props.user.id ===
                                (info.getValue() as Location).broker.id) && (
                            <>
                                <button
                                    onClick={(event: any) => {
                                        event.preventDefault();
                                        props.onEdit(
                                            info.getValue() as Location,
                                        );
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
                                            info.getValue() as Location,
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
                                (info.getValue() as Location).broker.id && (
                                <div className="truncate text-gray-500">
                                    (
                                    {
                                        (info.getValue() as Location).broker
                                            .first_name
                                    }{" "}
                                    {
                                        (info.getValue() as Location).broker
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

import { ColumnsProps, User, Zone } from "@/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export const useZoneColumns = (
    props: ColumnsProps<Zone> & { user: User },
): ColumnDef<Zone>[] => {
    return useMemo(() => {
        return [
            {
                accessorKey: "name",
                header: "Zone",
                cell: (info) => info.getValue(),
            },
            {
                accessorFn: (row) => row,
                header: "Actions",
                cell: (info) => (
                    <div className="flex space-x-2">
                        {(props.user.role === "ROLE_ADMIN" ||
                            props.user.id ===
                                (info.getValue() as Zone).broker.id) && (
                            <>
                                <button
                                    onClick={(event: any) => {
                                        event.preventDefault();
                                        props.onEdit(info.getValue() as Zone);
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
                                        props.onDelete(info.getValue() as Zone);
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
                                (info.getValue() as Zone).broker.id && (
                                <div className="truncate text-gray-500">
                                    (
                                    {
                                        (info.getValue() as Zone).broker
                                            .first_name
                                    }{" "}
                                    {(info.getValue() as Zone).broker.last_name}
                                    )
                                </div>
                            )}
                    </div>
                ),
            },
        ];
    }, []);
};

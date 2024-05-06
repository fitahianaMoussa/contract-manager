import { Age, ColumnsProps, Option, Price, User, Zone } from "@/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export const usePriceColumns = (
    props: ColumnsProps<Price> & { user: User },
): ColumnDef<Price>[] => {
    return useMemo(() => {
        return [
            {
                accessorKey: "value",
                header: "Prix",
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: "zone",
                header: "Zone",
                cell: (info) => (info.getValue() as Zone).name,
            },
            {
                accessorKey: "option",
                header: "Garantie",
                cell: (info) => (info.getValue() as Option).name,
            },
            {
                accessorKey: "age",
                header: "Age",
                cell: (info) => (info.getValue() as Age)?.value,
            },
            {
                accessorFn: (row) => row,
                header: "Actions",
                cell: (info) => (
                    <div className="flex space-x-2">
                        {(props.user.role === "ROLE_ADMIN" ||
                            props.user.id ===
                                (info.getValue() as Price).broker.id) && (
                            <>
                                <button
                                    onClick={(event: any) => {
                                        event.preventDefault();
                                        props.onEdit(info.getValue() as Price);
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
                                            info.getValue() as Price,
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
                                (info.getValue() as Price).broker.id && (
                                <div className="truncate text-gray-500">
                                    (
                                    {
                                        (info.getValue() as Price).broker
                                            .first_name
                                    }{" "}
                                    {
                                        (info.getValue() as Price).broker
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

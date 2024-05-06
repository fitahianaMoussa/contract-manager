import { ColumnsProps, Regulation, User } from "@/types";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export const useColumns = (
    props: ColumnsProps<Regulation> & { user: User },
): ColumnDef<Regulation>[] => {
    return useMemo(() => {
        return [
            {
                accessorKey: "title",
                cell: (info) => `${info.getValue()}`,
                header: () => "Titre",
            },
            {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    // <div className="relative">
                    <div className="flex space-x-2">
                        <Link
                            href={route(
                                "regulations.show",
                                (info.getValue() as Regulation).id,
                            )}
                            className={
                                "p-1 border border-transparent rounded-md"
                            }
                        >
                            <EyeIcon className="w-5 h-5 " />
                        </Link>
                        {props.user.role === "ROLE_ADMIN" && (
                            <>
                                <button
                                    // href={`/brokers/${(info.getValue() as any).id}/edit`}
                                    onClick={(event: any) => {
                                        event.preventDefault();
                                        props.onEdit(
                                            info.getValue() as Regulation,
                                        );
                                    }}
                                    className={
                                        "p-1 border border-transparent rounded-md"
                                    }
                                >
                                    <PencilIcon className="w-5 h-5 text-green-600" />
                                </button>
                                <button
                                    //href={`/brokers/${(info.getValue() as any).id}/delete`}
                                    onClick={(event: any) => {
                                        event.preventDefault();
                                        props.onDelete(
                                            info.getValue() as Regulation,
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
                    </div>
                ),
                header: () => "Action",
            },
        ];
    }, [props]);
};

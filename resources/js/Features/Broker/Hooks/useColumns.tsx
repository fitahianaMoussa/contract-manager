import Avatar from "@/Components/Avatar";
import Chip from "@/Components/Chip";
import { Broker, ColumnsProps } from "@/types";
import {
    EnvelopeIcon,
    EyeIcon,
    PencilIcon,
    PhoneIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export const useColumns = (
    props: ColumnsProps<Broker>,
): ColumnDef<Broker>[] => {
    return useMemo(() => {
        return [
            {
                accessorFn: (row) => row,
                id: "last_name",
                cell: (info) => {
                    const { email, phone, first_name, last_name } =
                        info.getValue() as Broker;
                    const name = `${first_name} ${last_name}`;

                    return (
                        <div className="flex items-center gap-2">
                            <Avatar size="lg" src="" alt={name} />
                            <div className="space-y-2">
                                <h2 className="text-[16px] font-semibold">
                                    {name}
                                </h2>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1 text-xs font-thin italic">
                                        <EnvelopeIcon className="w-3 h-3" />
                                        {email}
                                    </span>
                                    {phone && (
                                        <span className="flex items-center gap-1 text-xs font-thin italic">
                                            <PhoneIcon className="w-3 h-3" />
                                            {phone}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                },
                header: () => "Courtier",
            },
            {
                accessorKey: "clients",
                cell: (info) => `${(info.getValue() as Array<any>).length}`,
                header: () => "Clients",
            },
            {
                accessorKey: "role",
                cell: (info) =>
                    `${(info.getValue() as string).replace("ROLE_", "").toLowerCase()}`,
                header: () => "Role",
            },
            {
                accessorKey: "is_active",
                cell: (info) => (
                    <Chip type={info.getValue() ? "success" : "error"}>
                        {info.getValue() ? "active" : "inactive"}
                    </Chip>
                ),
                header: () => "Statut",
            },
            {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-2">
                        <Link
                            href={route(
                                "brokers.show",
                                (info.getValue() as Broker).id,
                            )}
                            className={
                                "p-1 border border-transparent rounded-md"
                            }
                        >
                            <EyeIcon className="w-5 h-5" />
                        </Link>

                        <button
                            onClick={(event: any) => {
                                event.preventDefault();
                                props.onEdit(info.getValue() as Broker);
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
                                props.onDelete(info.getValue() as Broker);
                            }}
                            className={
                                "p-1 border border-transparent rounded-md"
                            }
                        >
                            <TrashIcon className="w-5 h-5 text-red-600" />
                        </button>
                    </div>
                ),
                header: () => "Action",
            },
        ];
    }, [props]);
};

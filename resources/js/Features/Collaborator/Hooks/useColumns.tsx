import Avatar from "@/Components/Avatar";
import Chip from "@/Components/Chip";
import { Client, Collaborator, ColumnsProps } from "@/types";
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
    props: ColumnsProps<Collaborator>,
): ColumnDef<Collaborator>[] => {
    return useMemo(() => {
        return [
            {
                accessorFn: (row) => row,
                id: "last_name",
                cell: (info) => {
                    const { email, phone, first_name, last_name } =
                        info.getValue() as Collaborator;
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
                header: () => "Collaborateur",
            },
            {
                accessorKey: "clients",
                cell: (info) => `${(info.getValue() as Array<Client>).length}`,
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
                    // <div className="relative">
                    <div className="flex space-x-2">
                        <Link
                            href={route(
                                "collaborators.show",
                                (info.getValue() as Collaborator).id,
                            )}
                            className={
                                "p-1 border border-transparent rounded-md"
                            }
                        >
                            <EyeIcon className="w-5 h-5 " />
                        </Link>

                        <button
                            //  href={`/brokers/${(info.getValue() as any).id}/edit`}
                            onClick={(event: any) => {
                                event.preventDefault();
                                props.onEdit(info.getValue() as Collaborator);
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
                                props.onDelete(info.getValue() as Collaborator);
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

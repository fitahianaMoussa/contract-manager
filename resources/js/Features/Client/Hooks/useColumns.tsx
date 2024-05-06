import Avatar from "@/Components/Avatar";
import Chip from "@/Components/Chip";
import {
    BrokerCollaborator,
    BrokerManager,
    Client,
    ColumnsProps,
    User,
} from "@/types";
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
    props: ColumnsProps<Client> & { user: User },
): ColumnDef<Client>[] => {
    const canEditOrDelete = (client: Client) =>
        ["ROLE_SUPERUSER", "ROLE_ADMIN", "ROLE_COLLABORATOR"].includes(
            props.user.role,
        ) ||
        ([
            "ROLE_BROKER",
            "ROLE_BROKER_COLLABORATOR",
            "ROLE_BROKER_MANAGER",
        ].includes(props.user.role) &&
            (client.broker.id === props.user.id ||
                client.broker.broker_id === props.user.id ||
                client.broker.broker_id ===
                    (props.user as BrokerCollaborator).broker_id ||
                client.broker.id === (props.user as BrokerManager).broker_id));

    return useMemo(() => {
        return [
            {
                accessorFn: (row) => row,
                id: "last_name",
                cell: (info) => {
                    const { email, phone, first_name, last_name } =
                        info.getValue() as Client;
                    const name = `${first_name} ${last_name}`;
                    return (
                        <div className="flex items-center gap-2">
                            <Avatar size="lg" src="" alt={name} />
                            <div className="space-y-2">
                                <h2 className="text-[16px] font-semibold">
                                    {last_name}
                                </h2>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1 text-xs font-thin italic">
                                        <EnvelopeIcon className="w-3 h-3" />
                                        {email}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs font-thin italic">
                                        <PhoneIcon className="w-3 h-3" />
                                        {phone}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                },
                header: () => "Client",
            },
            {
                accessorKey: "contracts",
                cell: (info) => `${(info.getValue() as Array<any>).length}`,
                header: () => "Assurance",
            },
            {
                accessorKey: "is_valid",
                cell: (info) => (
                    <Chip type={info.getValue() ? "success" : "error"}>
                        {info.getValue() ? "Valide" : "Non valide"}
                    </Chip>
                ),
                header: () => "Validation",
            },
            {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-2">
                        <Link
                            href={`/clients/${(info.getValue() as Client).id}/show`}
                            className={
                                "p-1 border border-transparent rounded-md"
                            }
                        >
                            <EyeIcon className="w-5 h-5" />
                        </Link>

                        {canEditOrDelete(info.getValue() as any) && (
                            <button
                                className={
                                    "p-1 border border-transparent rounded-md"
                                }
                                onClick={(event: any) => {
                                    event.preventDefault();
                                    props.onEdit(info.getValue() as Client);
                                }}
                            >
                                <PencilIcon className="w-5 h-5 text-green-600" />
                            </button>
                        )}

                        {canEditOrDelete(info.getValue() as any) && (
                            <button
                                className={
                                    "p-1 border border-transparent rounded-md"
                                }
                                onClick={(event: any) => {
                                    event.preventDefault();
                                    props.onDelete(info.getValue() as Client);
                                }}
                            >
                                <TrashIcon className="w-5 h-5 text-red-600" />
                            </button>
                        )}
                    </div>
                ),
                header: () => "Action",
            },
        ];
    }, [props]);
};

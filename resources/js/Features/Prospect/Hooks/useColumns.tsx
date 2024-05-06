import Avatar from "@/Components/Avatar";
import { ColumnsProps, Prospect, User } from "@/types";
import {
    EnvelopeIcon,
    EyeIcon,
    MapPinIcon,
    PencilIcon,
    PhoneIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export const useColumns = (
    props: ColumnsProps<Prospect> & { user: User },
): ColumnDef<Prospect>[] => {
    return useMemo(() => {
        return [
            {
                accessorFn: (row) => row,
                id: "last_name",
                cell: (info) => {
                    const { email, phone, first_name, last_name } =
                        info.getValue() as Prospect;
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
                header: () => "Prospect",
            },
            {
                accessorKey: "status",
                cell: (info) => {
                    const status = info.getValue();
                    let bgColor, textColor, borderColor;

                    switch (status) {
                        case "qualified":
                            bgColor = "bg-green-100 dark:bg-green-700";
                            textColor = "text-green-800 dark:text-green-200";
                            borderColor = "border-green-400";
                            break;
                        case "unqualified":
                            bgColor = "bg-red-100 dark:bg-red-700";
                            textColor = "text-red-800 dark:text-red-200";
                            borderColor = "border-red-400";
                            break;
                        case "converted":
                            bgColor = "bg-blue-100 dark:bg-blue-700";
                            textColor = "text-blue-800 dark:text-blue-200";
                            borderColor = "border-blue-400";
                            break;
                        default:
                            bgColor = "bg-gray-100 dark:bg-gray-700";
                            textColor = "text-gray-800 dark:text-gray-200";
                            borderColor = "border-gray-400";
                    }

                    return (
                        <span
                            className={`font-medium me-2 px-2.5 py-0.5 rounded-full ${bgColor} ${textColor} border ${borderColor}`}
                        >
                            {status as any}
                        </span>
                    );
                },
                header: () => "Status",
            },
            {
                accessorFn: (row) => row,
                id: "address",
                cell: (info) => {
                    const { address, city, country, postal_code } =
                        info.getValue() as Prospect;
                    return (
                        <div className="flex items-center gap-2">
                            <div className="space-y-2">
                                <h2 className="text-[16px] font-semibold">
                                    {address}
                                </h2>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1 text-xs font-thin italic">
                                        <MapPinIcon className="w-5 h-4" />
                                        {postal_code}, {city}, {country}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                },
                header: () => "Addresse",
            },

            {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-2">
                        <Link
                            href={`/prospects/${(info.getValue() as Prospect).id}/show`}
                            className="p-1 border border-transparent rounded-md"
                        >
                            <EyeIcon className="w-5 h-5" />
                        </Link>

                        <button
                            className="p-1 border border-transparent rounded-md"
                            onClick={(event: any) => {
                                event.preventDefault();
                                props.onEdit(info.getValue() as Prospect);
                            }}
                        >
                            <PencilIcon className="w-5 h-5 text-green-600" />
                        </button>

                        <button
                            className="p-1 border border-transparent rounded-md"
                            onClick={(event: any) => {
                                event.preventDefault();
                                props.onDelete(info.getValue() as Prospect);
                            }}
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

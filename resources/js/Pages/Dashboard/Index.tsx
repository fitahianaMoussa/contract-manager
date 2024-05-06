import Avatar from "@/Components/Avatar";
import Card from "@/Components/Card";
import Datagrid from "@/Components/Datagrid";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { format as formatCurrency } from "@/Utils/Currency";
import { format as formatDate } from "@/Utils/Date";
import { Head } from "@inertiajs/react";
import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
);

export default function Index({
    auth,
    initialValues,
}: PageProps<{ initialValues: any }>) {
    const [data, setData] = useState(initialValues);

    useEffect(() => {
        window.Echo.private("App.Models.Client.Created").listen(
            "ClientCreated",
            (e: any) => {
                const last_clients = Object.values(e.last_clients).reverse();
                setData((prevState: any) => ({
                    ...prevState,
                    ...e,
                    last_clients,
                }));
            },
        );
        window.Echo.private("App.Models.Client.Validated").listen(
            "ClientValidated",
            (e: any) => {
                // console.log(e);
            },
        );
        window.Echo.private("App.Models.Contract.Created").listen(
            "ContractCreated",
            (e: any) => {
                // console.log(e);
            },
        );
        return () => {};
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="light:text-gray-200 text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Tableau de bord
                </h2>
            }
        >
            <Head title="Tableau de bord" />

            <div className="py-12">
                <div className="mx-5 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-5 text-gray-900 shadow-sm sm:rounded-lg dark:bg-gray-800 dark:text-gray-100">
                        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="flex h-32 flex-col justify-center rounded-md border-l-4 border-green-500 bg-white px-6 shadow-md hover:shadow-lg dark:bg-gray-700">
                                <h5 className="text-3xl font-semibold">
                                    {data.clients_count}
                                </h5>
                                <p className="">Clients</p>
                            </div>
                            <div className="flex h-32 flex-col justify-center rounded-md border-l-4 border-green-500 bg-white px-6 shadow-md hover:shadow-lg dark:bg-gray-700">
                                <h5 className="text-3xl font-semibold">
                                    {data.valid_clients_count}
                                </h5>
                                <p className="">Clients validés</p>
                            </div>
                            <div className="flex h-32 flex-col justify-center rounded-md border-l-4 border-green-500 bg-white px-6 shadow-md hover:shadow-lg dark:bg-gray-700">
                                <h5 className="text-3xl font-semibold">
                                    {data.contracts_count}
                                </h5>
                                <p className="">Contrats actifs</p>
                            </div>
                            <div className="flex h-32 flex-col justify-center rounded-md border-l-4 border-green-500 bg-white px-6 shadow-md hover:shadow-lg dark:bg-gray-700">
                                <h5 className="text-3xl font-semibold">
                                    {formatCurrency(`${data.income}`)}
                                </h5>
                                <p className="">Ventes</p>
                            </div>
                        </div>
                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-6">
                            <Card className="col-span-2 h-96 dark:!bg-gray-700">
                                <Card.Header title="Les revenus ce mois ci" />
                                <Card.Content className="p-0">
                                    <Doughnut
                                        options={{ responsive: true }}
                                        data={{
                                            labels: data.pie.map(
                                                (item: any) => item.name,
                                            ),
                                            datasets: [
                                                {
                                                    label: "Vente",
                                                    data: data.pie.map(
                                                        (item: any) =>
                                                            item.amount,
                                                    ),
                                                    backgroundColor: [
                                                        "#86efac",
                                                        "#22c55e",
                                                    ],
                                                },
                                            ],
                                        }}
                                    />
                                </Card.Content>
                            </Card>
                            <Card className=" col-span-4 h-96 dark:!bg-gray-700">
                                <Card.Header title="Les revenus cette année" />
                                <Card.Content className="">
                                    <Line
                                        options={{
                                            responsive: true,
                                            scales: {
                                                y: { min: 0.0, max: 1000.0 },
                                            },
                                        }}
                                        data={{
                                            labels: data.line.map(
                                                (item: any) => item.month,
                                            ),
                                            datasets: [
                                                {
                                                    label: "Vente",
                                                    data: data.line.map(
                                                        (item: any) =>
                                                            item.amount,
                                                    ),
                                                    borderColor: "#86efac",
                                                    backgroundColor: "#22c55e",
                                                },
                                            ],
                                        }}
                                    />
                                </Card.Content>
                            </Card>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Card className="h-96 dark:!bg-gray-700">
                                <Card.Header title="Les 10 derniers clients" />
                                <Card.Content className="relative">
                                    <Datagrid
                                        className="h-full dark:!bg-gray-700"
                                        columns={[
                                            {
                                                accessorFn: (row) => ({
                                                    first_name: row?.first_name,
                                                    last_name: row?.last_name,
                                                }),
                                                header: "Client",
                                                cell: (info) => (
                                                    <div className="flex items-center gap-2">
                                                        <Avatar
                                                            src={""}
                                                            alt={`${(info.getValue() as any)?.first_name} ${(info.getValue() as any)?.last_name}`}
                                                        />
                                                        <h4>
                                                            {
                                                                (
                                                                    info.getValue() as any
                                                                )?.first_name
                                                            }{" "}
                                                            {
                                                                (
                                                                    info.getValue() as any
                                                                )?.last_name
                                                            }
                                                        </h4>
                                                    </div>
                                                ),
                                            },
                                            {
                                                accessorKey: "created_at",
                                                header: "Ajouté le",
                                                cell: (info) =>
                                                    formatDate(
                                                        info.getValue() as any,
                                                        "relative",
                                                    ),
                                            },
                                        ]}
                                        rows={data.last_clients}
                                        pagination={false}
                                        // minHeight="100px"
                                    />
                                </Card.Content>
                            </Card>
                            <Card className="h-96 dark:!bg-gray-700">
                                <Card.Header title="Les 10 derniers contrats" />
                                <Card.Content>
                                    <Datagrid
                                        className="h-full dark:!bg-gray-700"
                                        columns={[
                                            {
                                                accessorFn: (row) => ({
                                                    first_name:
                                                        row.client?.first_name,
                                                    last_name:
                                                        row.client?.last_name,
                                                }),
                                                header: "Client",
                                                cell: (info) => (
                                                    <div className="flex items-center gap-2">
                                                        <Avatar
                                                            src={""}
                                                            alt={`${(info.getValue() as any)?.first_name} ${(info.getValue() as any)?.last_name}`}
                                                        />
                                                        <h4>
                                                            {
                                                                (
                                                                    info.getValue() as any
                                                                )?.first_name
                                                            }{" "}
                                                            {
                                                                (
                                                                    info.getValue() as any
                                                                )?.last_name
                                                            }
                                                        </h4>
                                                    </div>
                                                ),
                                            },
                                            {
                                                accessorKey: "amount",
                                                header: "Montant",
                                                cell: (info) =>
                                                    formatCurrency(
                                                        `${info.getValue() as any}`,
                                                    ),
                                            },
                                        ]}
                                        rows={data.last_contracts}
                                        pagination={false}
                                    />
                                </Card.Content>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

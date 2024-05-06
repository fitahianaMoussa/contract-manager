export default function Pdf({ company }: { company: any }) {
    return (
        <div id="pdf">
            <div className=" mx-auto rounded-md bg-white p-5 shadow-md">
                <h6 className="mb-4 text-lg font-bold">
                    Information de {company.data.name}:
                </h6>
                <table className="mb-4">
                    <tbody>
                        <tr>
                            <td className="font-semibold">Nom:</td>
                            <td>{company.data.name}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Email:</td>
                            <td>{company.data.email}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Phone:</td>
                            <td>{company.data.phone}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Address:</td>
                            <td>
                                {company.data.street}, {company.data.city},{" "}
                                {company.data.country}, {company.data.zip_code}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Description:</td>
                            <td>{company.data.description}</td>
                        </tr>
                    </tbody>
                </table>

                <h6 className="mb-4 text-lg font-bold">
                    Liste des produits de {company.data.name}:
                </h6>
                <p className="mb-2">
                    Nombre de produits:{" "}
                    <span className="font-semibold">
                        {company.data.products.length}
                    </span>
                </p>
                <table className="">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Nom du produit</th>
                            <th className="px-4 py-2">
                                Description du produit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {company.data.products.map((product: any) => (
                            <tr key={product.id}>
                                <td className="border px-4 py-2">
                                    {product.name}
                                </td>
                                <td className="border px-4 py-2">
                                    {product.description}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import {
    mapRegimeToFrench,
    mapInsuredPersonToFrench,
} from "../Utils/Translations.ts";

const generateCompanyPDF = async (company) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    let y = height - 50;
    page.drawText(`Information de ${company.data.name}:`, {
        x: 50,
        y,
        size: 14,
        color: rgb(0, 0.5, 0),
    });
    y -= 20;

    const companyData = [
        ["Nom:", company.data.name],
        ["Email:", company.data.email],
        ["Phone:", company.data.phone],
        [
            "Address:",
            `${company.data.street}, ${company.data.city}, ${company.data.country}, ${company.data.zip_code}`,
        ],
        ["Description:", company.data.description],
    ];

    for (const [label, value] of companyData) {
        page.drawText(label, { x: 50, y, size: 10 });
        page.drawText(value, { x: 150, y, size: 10 });
        y -= 20;
    }

    const productData = company.data.products.map((product) => [
        product.name,
        product.description,
    ]);

    page.drawText(`Liste des produits de ${company.data.name}:`, {
        x: 50,
        y: y - 50,
        size: 14,
        color: rgb(0, 0.5, 0),
    });
    y -= 70;

    if (productData.length > 0) {
        for (const [productName, productDescription] of productData) {
            page.drawText(productName, { x: 50, y, size: 10 });
            page.drawText(productDescription, { x: 150, y, size: 10 });
            y -= 20;
        }
    } else {
        page.drawText(`Aucun produit trouvé.`, { x: 50, y, size: 12 });
    }

    const pdfBytes = await pdfDoc.save();
    saveAs(
        new Blob([pdfBytes], { type: "application/pdf" }),
        `${company.data.name}_Details.pdf`,
    );
};
const generateClientPDF = async (client) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    let y = height - 50;
    page.drawText(`Informations du client:`, {
        x: 50,
        y,
        size: 14,
        color: rgb(0, 0.5, 0),
    });
    y -= 20;

    const clientData = [
        ["Nom:", client.first_name],
        ["Prénom:", client.last_name],
        ["Email:", client.email],
        ["Phone:", client.phone],
        ["Date de naissance:", client.date_of_birth],
        ["N° sécurité sociale:", client.social_security_number],
        ["Address:", `${client.street}, ${client.city}, ${client.country}`],
        ["Régime:", mapRegimeToFrench(client.regime)],
        ["Personne assurée:", mapInsuredPersonToFrench(client.insured_person)],
    ];

    for (const [label, value] of clientData) {
        page.drawText(label, { x: 50, y, size: 10 });
        page.drawText(value, { x: 150, y, size: 10 });
        y -= 20;
    }

    const contractsData = client.contracts.map((contract) => [
        contract.name,
        contract.due,
        contract.description,
        contract.created_at,
    ]);

    page.drawText(`Liste des contrats :`, {
        x: 50,
        y: y - 50,
        size: 14,
        color: rgb(0, 0.5, 0),
    });
    y -= 70;

    if (contractsData.length > 0) {
        for (const contract of contractsData) {
            for (const value of contract) {
                page.drawText(value, { x: 50, y, size: 10 });
                y -= 20;
            }
        }
    } else {
        page.drawText(`Aucun contrat trouvé.`, { x: 50, y, size: 12 });
    }

    const pdfBytes = await pdfDoc.save();
    saveAs(
        new Blob([pdfBytes], { type: "application/pdf" }),
        `${client.first_name}_${client.last_name}_Details.pdf`,
    );
};

const generateBrokerPDF = async (broker) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    let y = height - 50;
    page.drawText(`Informations du courtier:`, {
        x: 50,
        y,
        size: 14,
        color: rgb(0, 0.5, 0),
    });
    y -= 20;

    const brokerData = [
        ["Nom:", broker.last_name],
        ["Prénom:", broker.first_name],
        ["Email:", broker.email],
        ["Status:", broker.is_active ? "Active" : "Inactive"],
        ["Phone:", broker.phone],
        ["Addresse du bureau:", broker.office_address],
    ];

    for (const [label, value] of brokerData) {
        if (value !== undefined) {
            page.drawText(label, { x: 50, y, size: 10 });
            page.drawText(value.toString(), { x: 150, y, size: 10 });
            y -= 20;
        }
    }

    page.drawText(`Liste des clients :`, {
        x: 50,
        y: y - 50,
        size: 14,
        color: rgb(0, 0.5, 0),
    });
    y -= 70;

    if (broker.clients.length > 0) {
        for (const client of broker.clients) {
            page.drawText(
                `${client.last_name}, ${client.first_name}, ${client.email}, ${client.phone}, ${client.street}, ${client.city}, ${client.country}`,
                { x: 50, y, size: 10 },
            );
            y -= 20;
        }
    } else {
        page.drawText(`Aucun client trouvé.`, { x: 50, y, size: 12 });
    }

    page.drawText(`Liste des companies :`, {
        x: 50,
        y: y - 50,
        size: 14,
        color: rgb(0, 0.5, 0),
    });
    y -= 70;

    if (broker.companies.length > 0) {
        for (const company of broker.companies) {
            page.drawText(
                `${company.name}, ${company.email}, ${company.phone}, ${company.street}, ${company.city}, ${company.country}, ${company.zip_code}, ${company.description}`,
                { x: 50, y, size: 10 },
            );
            y -= 20;
        }
    } else {
        page.drawText(`Aucune companie trouvé.`, { x: 50, y, size: 12 });
    }

    const pdfBytes = await pdfDoc.save();
    saveAs(
        new Blob([pdfBytes], { type: "application/pdf" }),
        `${broker.first_name}_${broker.last_name}_Details.pdf`,
    );
};
const generateRegulationPDF = async (regulation) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    let y = height - 50;
    page.drawText(`Informations de reglémentation:`, {
        x: 50,
        y,
        size: 14,
        color: rgb(0, 0.5, 0),
    });
    y -= 20;

    const regulationData = [
        ["Titre:", regulation.title],
        ["Contenu:", regulation.content],
    ];

    for (const [label, value] of regulationData) {
        if (value !== undefined) {
            page.drawText(label, { x: 50, y, size: 10 });
            page.drawText(value.toString(), { x: 150, y, size: 10 });
            y -= 20;
        }
    }

    const pdfBytes = await pdfDoc.save();
    saveAs(
        new Blob([pdfBytes], { type: "application/pdf" }),
        `${regulation.title}_Details.pdf`,
    );
};

export {
    generateCompanyPDF,
    generateClientPDF,
    generateBrokerPDF,
    generateRegulationPDF,
};

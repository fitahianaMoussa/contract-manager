import React from "react";
interface ItemProps {
    label: string;
    value: any;
}

const InfoItem: React.FC<ItemProps> = ({ label, value }) => {
    return (
        <p className="mb-2 text-sm">
            <span className="font-semibold">{label}:</span> {value}
        </p>
    );
};

export default InfoItem;

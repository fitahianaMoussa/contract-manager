import { RefAttributes, useEffect, useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";
import Dropzone, { DropzoneProps, DropzoneRef } from "react-dropzone";

type CustomDropzoneProps = DropzoneProps &
    RefAttributes<DropzoneRef> & {
        id?: string;
        name?: string;
        className?: string;
        onChange?: (files: File[]) => void;
    };

export default function CustomDropzone({
    id,
    name,
    className,
    onChange,
    ...props
}: CustomDropzoneProps) {
    const [files, setFiles] = useState<(File & { preview: string })[]>([]);

    const thumbs = files.map((file) => (
        <div
            className="inline-flex rounded-md border border-gray-800 me-2 p-1 w-24 h-24 box-border"
            key={file.name}
        >
            <div className="flex min-w-0 overflow-hidden">
                <img
                    src={file.preview}
                    className="block w-auto h-full"
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                    }}
                />
            </div>
        </div>
    ));

    useEffect(() => {
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <>
            <Dropzone
                {...props}
                onDrop={(acceptedFiles) => {
                    setFiles(
                        acceptedFiles.map((file) =>
                            Object.assign(file, {
                                preview: URL.createObjectURL(file),
                            }),
                        ),
                    );
                    onChange?.(acceptedFiles);
                }}
            >
                {({ getRootProps, getInputProps }) => (
                    <div
                        {...getRootProps()}
                        id={id}
                        className={
                            "flex flex-col items-center justify-center gap-2 py-10 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:hover:border-gray-500 " +
                            className
                        }
                    >
                        <input {...getInputProps()} name={name} />
                        <ArrowUpTrayIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Faites glisser et déposez quelques fichiers ici, ou
                            cliquez pour sélectionner des dossiers
                        </p>
                    </div>
                )}
            </Dropzone>
            <div className="flex flex-wrap mt-4">{thumbs}</div>
        </>
    );
}

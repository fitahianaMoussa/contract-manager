import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Fragment, PropsWithChildren } from "react";

export default function Modal({
    children,
    show = false,
    title,
    maxWidth = "2xl",
    closeable = true,
    onClose = () => {},
}: PropsWithChildren<{
    show: boolean;
    title?: string;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
    closeable?: boolean;
    onClose: CallableFunction;
}>) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
    }[maxWidth];

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex px-4 py-6 sm:px-0 items-center z-50 transform transition-all"
                onClose={close}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-500/75 light:bg-gray-900/75" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div className="fixed inset-0 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Dialog.Panel
                                className={`mb-6 bg-white light:bg-gray-800 dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${maxWidthClass}`}
                            >
                                {title && (
                                    <div className="flex justify-between items-center px-5 py-4 rounded-t border-b light:border-gray-600 dark:border-gray-600">
                                        <h3 className="text-lg font-semibold text-gray-900 light:text-white dark:text-white">
                                            {title}
                                        </h3>
                                        {closeable && (
                                            <button
                                                type="button"
                                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex items-center light:hover:bg-gray-600 dark:hover:bg-gray-600 light:hover:text-white dark:hover:text-white"
                                                data-modal-toggle="defaultModal"
                                                onClick={() => onClose()}
                                            >
                                                <XMarkIcon className="w-5 h-5" />
                                                <span className="sr-only">
                                                    Close modal
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                )}

                                {children}
                            </Dialog.Panel>
                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}

import "react-toastify/dist/ReactToastify.css";
import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { Slide, ToastContainer } from "react-toastify";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx"),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <App {...props} />
                <ToastContainer
                    position="top-right"
                    hideProgressBar
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    pauseOnHover={false}
                    theme="colored"
                    transition={Slide}
                    newestOnTop={false}
                    draggable={false}
                />
            </>,
        );
    },
    progress: {
        color: "#4B5563",
    },
});

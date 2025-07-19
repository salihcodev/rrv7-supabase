import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";
import { Toaster } from "sonner";

import type { Route } from "./+types/root";
import "./app.css";
import { Header } from "./components/shared/Header";
import { Footer } from "./components/shared/Footer";
import { PageTransition } from "./components/shared/PageTransition";
import { LoadingProvider } from "./components/shared/LoadingProvider";
import { ThemeProvider } from "./components/shared/ThemeProvider";

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="h-full antialiased">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body className="flex h-full flex-col bg-background text-foreground">
                <ThemeProvider defaultTheme="system" storageKey="app-theme">
                    <LoadingProvider>
                        <Header />
                        <main className="flex-1 bg-background text-foreground">
                            <div className="container mx-auto py-8 px-4 bg-background text-foreground">
                                <PageTransition>{children}</PageTransition>
                            </div>
                        </main>
                        <Footer />
                        <Toaster position="bottom-right" expand={true} />
                    </LoadingProvider>
                </ThemeProvider>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="flex min-h-[50vh] items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">{message}</h1>
                <p className="text-foreground/80 mb-8">{details}</p>
                {stack && (
                    <pre className="mt-4 max-w-[80vw] overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                        <code>{stack}</code>
                    </pre>
                )}
            </div>
        </main>
    );
}

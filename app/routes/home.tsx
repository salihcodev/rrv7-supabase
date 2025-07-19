import { Link } from "react-router-dom";
import { Button } from "~/components/ui/button";

export default function Home() {
    return (
        <div className="space-y-24">
            {/* Hero Section */}
            <section className="py-20 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Build Modern Web Apps
                </h1>
                <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
                    A powerful stack combining React Router v7 and Supabase for
                    building fast, scalable, and modern web applications.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                        <Link to="/items">Get Started</Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on GitHub
                        </a>
                    </Button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Why Choose Our Stack?
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="p-6 rounded-lg border bg-card text-card-foreground">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <svg
                                className="w-6 h-6 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            Lightning Fast
                        </h3>
                        <p className="text-foreground/80">
                            Built with performance in mind, ensuring your app
                            loads quickly and runs smoothly.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="p-6 rounded-lg border bg-card text-card-foreground">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <svg
                                className="w-6 h-6 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            Modern Stack
                        </h3>
                        <p className="text-foreground/80">
                            Leveraging the latest features from React Router v7
                            and Supabase for a modern development experience.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="p-6 rounded-lg border bg-card text-card-foreground">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <svg
                                className="w-6 h-6 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            Secure by Default
                        </h3>
                        <p className="text-foreground/80">
                            Built-in authentication and security features to
                            keep your application and users safe.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 text-center bg-muted rounded-lg">
                <h2 className="text-3xl font-bold mb-4">
                    Ready to Get Started?
                </h2>
                <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
                    Join thousands of developers building modern web
                    applications with our stack.
                </p>
                <Button asChild size="lg">
                    <Link to="/items">Start Building</Link>
                </Button>
            </section>
        </div>
    );
}

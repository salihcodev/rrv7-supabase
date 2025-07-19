import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <header className="w-full py-4 bg-background border-b">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            RRv7 App
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/"
                            className="text-foreground/80 hover:text-foreground transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/items"
                            className="text-foreground/80 hover:text-foreground transition-colors"
                        >
                            Items
                        </Link>
                        <Button variant="default" size="sm">
                            Get Started
                        </Button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-foreground/80 hover:text-foreground"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden mt-4 pb-4 space-y-4">
                        <Link
                            to="/"
                            className="block text-foreground/80 hover:text-foreground transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/items"
                            className="block text-foreground/80 hover:text-foreground transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Items
                        </Link>
                        <Button variant="default" size="sm" className="w-full">
                            Get Started
                        </Button>
                    </nav>
                )}
            </div>
        </header>
    );
}

import * as React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { BlurFade } from "../ui/blur-fade";
import { ThemeSwitcher } from "./ThemeSwitcher";

const NAV_LINKS = [
    { to: "/", label: "Home" },
    { to: "/items", label: "Items" },
];

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <header className="w-full py-4 bg-background border-b">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <BlurFade delay={0.1} direction="left">
                        <NavLink to="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                                RRv7 App
                            </span>
                        </NavLink>
                    </BlurFade>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {NAV_LINKS.map((link, idx) => (
                            <BlurFade
                                key={link.to}
                                delay={0.2 + idx * 0.1}
                                direction="down"
                            >
                                <NavLink
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `text-foreground/80 hover:text-foreground transition-colors${
                                            isActive
                                                ? " font-semibold text-foreground"
                                                : ""
                                        }`
                                    }
                                    end={link.to === "/"}
                                >
                                    {link.label}
                                </NavLink>
                            </BlurFade>
                        ))}
                        <ThemeSwitcher />
                        <BlurFade delay={0.4} direction="down">
                            <Button variant="default" size="sm">
                                Get Started
                            </Button>
                        </BlurFade>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center space-x-4 md:hidden">
                        <ThemeSwitcher />
                        <BlurFade delay={0.2} direction="right">
                            <button
                                className="p-2 text-foreground/80 hover:text-foreground"
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
                        </BlurFade>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden mt-4 pb-4 space-y-4">
                        {NAV_LINKS.map((link, idx) => (
                            <BlurFade
                                key={link.to}
                                delay={0.1 + idx * 0.1}
                                direction="right"
                            >
                                <NavLink
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `block text-foreground/80 hover:text-foreground transition-colors${
                                            isActive
                                                ? " font-semibold text-foreground"
                                                : ""
                                        }`
                                    }
                                    end={link.to === "/"}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </NavLink>
                            </BlurFade>
                        ))}
                        <BlurFade delay={0.3} direction="right">
                            <Button
                                variant="default"
                                size="sm"
                                className="w-full"
                            >
                                Get Started
                            </Button>
                        </BlurFade>
                    </nav>
                )}
            </div>
        </header>
    );
}

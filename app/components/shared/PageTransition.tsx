import { useLocation } from "react-router-dom";
import { Fade } from "../ui/transitions";

interface PageTransitionProps {
    children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
    const location = useLocation();

    return (
        <Fade
            key={location.pathname}
            duration={0.5}
            className="min-h-[calc(100vh-4rem)]"
        >
            {children}
        </Fade>
    );
}

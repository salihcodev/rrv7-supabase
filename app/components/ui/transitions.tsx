import {
    AnimatePresence,
    motion,
    useInView,
    type UseInViewOptions,
    type Variants,
    type MotionProps,
} from "framer-motion";
import { useRef } from "react";

// Helper to merge theme classes with user classes
function mergeClassNames(...classes: (string | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}

type MarginType = UseInViewOptions["margin"];

interface TransitionProps extends MotionProps {
    children: React.ReactNode;
    className?: string;
    duration?: number;
    delay?: number;
    inView?: boolean;
    inViewMargin?: MarginType;
    themeClassName?: string; // allow passing theme class
}

// Slide transition component
interface SlideProps extends TransitionProps {
    direction?: "up" | "down" | "left" | "right";
    distance?: number;
}

export function Slide({
    children,
    className,
    themeClassName,
    duration = 0.4,
    delay = 0,
    direction = "right",
    distance = 100,
    inView = false,
    inViewMargin = "-50px",
    ...props
}: SlideProps) {
    const ref = useRef(null);
    const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
    const isInView = !inView || inViewResult;

    // Use CSS variables for color if needed for theming
    const variants: Variants = {
        hidden: {
            [direction === "left" || direction === "right" ? "x" : "y"]:
                direction === "right" || direction === "down"
                    ? -distance
                    : distance,
            opacity: 0,
            backgroundColor: "var(--color-background)",
            color: "var(--color-foreground)",
        },
        visible: {
            [direction === "left" || direction === "right" ? "x" : "y"]: 0,
            opacity: 1,
            backgroundColor: "var(--color-background)",
            color: "var(--color-foreground)",
        },
    };

    return (
        <AnimatePresence>
            <motion.div
                ref={ref}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                exit="hidden"
                variants={variants}
                transition={{
                    delay: delay,
                    duration,
                    ease: "easeOut",
                }}
                className={mergeClassNames(themeClassName, className)}
                {...props}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

// Scale transition component
interface ScaleProps extends TransitionProps {
    scaleFrom?: number;
}

export function Scale({
    children,
    className,
    themeClassName,
    duration = 0.4,
    delay = 0,
    scaleFrom = 0.95,
    inView = false,
    inViewMargin = "-50px",
    ...props
}: ScaleProps) {
    const ref = useRef(null);
    const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
    const isInView = !inView || inViewResult;

    const variants: Variants = {
        hidden: {
            scale: scaleFrom,
            opacity: 0,
            backgroundColor: "var(--color-background)",
            color: "var(--color-foreground)",
        },
        visible: {
            scale: 1,
            opacity: 1,
            backgroundColor: "var(--color-background)",
            color: "var(--color-foreground)",
        },
    };

    return (
        <AnimatePresence>
            <motion.div
                ref={ref}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                exit="hidden"
                variants={variants}
                transition={{
                    delay: delay,
                    duration,
                    ease: "easeOut",
                }}
                className={mergeClassNames(themeClassName, className)}
                {...props}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

// Fade transition component
export function Fade({
    children,
    className,
    themeClassName,
    duration = 0.4,
    delay = 0,
    inView = false,
    inViewMargin = "-50px",
    ...props
}: TransitionProps) {
    const ref = useRef(null);
    const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
    const isInView = !inView || inViewResult;

    const variants: Variants = {
        hidden: {
            opacity: 0,
            backgroundColor: "var(--color-background)",
            color: "var(--color-foreground)",
        },
        visible: {
            opacity: 1,
            backgroundColor: "var(--color-background)",
            color: "var(--color-foreground)",
        },
    };

    return (
        <AnimatePresence>
            <motion.div
                ref={ref}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                exit="hidden"
                variants={variants}
                transition={{
                    delay: delay,
                    duration,
                    ease: "easeOut",
                }}
                className={mergeClassNames(themeClassName, className)}
                {...props}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

// Rotate transition component
interface RotateProps extends TransitionProps {
    rotateFrom?: number;
}

export function Rotate({
    children,
    className,
    themeClassName,
    duration = 0.4,
    delay = 0,
    rotateFrom = 180,
    inView = false,
    inViewMargin = "-50px",
    ...props
}: RotateProps) {
    const ref = useRef(null);
    const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
    const isInView = !inView || inViewResult;

    const variants: Variants = {
        hidden: {
            rotate: rotateFrom,
            opacity: 0,
            backgroundColor: "var(--color-background)",
            color: "var(--color-foreground)",
        },
        visible: {
            rotate: 0,
            opacity: 1,
            backgroundColor: "var(--color-background)",
            color: "var(--color-foreground)",
        },
    };

    return (
        <AnimatePresence>
            <motion.div
                ref={ref}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                exit="hidden"
                variants={variants}
                transition={{
                    delay: delay,
                    duration,
                    ease: "easeOut",
                }}
                className={mergeClassNames(themeClassName, className)}
                {...props}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

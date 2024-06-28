// Define base classes for all buttons
export const baseClasses =
  "flex items-center justify-center gap-2 rounded-lg text-base font-normal transition duration-300 ease-in-out ";

// Size classes
export const sizeClasses = {
  sm: "h-8 px-2",
  md: "h-8 px-2",
  lg: "h-10 px-2",
};
// Variant and color classes
export const variantColorClasses = {
  contained: {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    accent: "bg-accent text-white",
    success: "bg-success text-white",
    info: "bg-info text-white",
    warning: "bg-warning text-white",
    error: "bg-error text-white",
  },
  outlined: {
    primary: "border-primary/50  border bg-transparent text-primary",
    secondary: "border-secondary/50  border bg-transparent text-secondary",
    accent: "border-accent/50  border bg-transparent text-accent",
    success: "border-success/50 border bg-transparent text-success",
    info: "border-info/50 border bg-transparent text-info",
    warning: "border-warning/50  border bg-transparent text-warning",
    error: "border-error/50  border bg-transparent text-error",
  },
  text: {
    primary: " bg-transparent text-primary",
    secondary: " bg-transparent text-secondary",
    accent: " bg-transparent text-accent",
    success: " bg-transparent text-success",
    info: " bg-transparent text-info",
    warning: " bg-transparent text-warning",
    error: " bg-transparent text-error",
  },
  soft: {
    primary: "bg-primary/10  text-primary-dark dark:!text-primary-light",
    secondary:
      "bg-secondary/10  text-secondary-dark dark:!text-secondary-light",
    accent: "bg-accent/10  text-accent-dark dark:!text-accent-light",
    success: "bg-success/10  text-success-dark dark:!text-success-light",
    info: "bg-info/10  text-info-dark dark:text-primary-light",
    warning: "bg-warning/10  text-warning-dark dark:!text-warning-light",
    error: "bg-error/10  text-error-dark dark:!text-error-light",
  },
};

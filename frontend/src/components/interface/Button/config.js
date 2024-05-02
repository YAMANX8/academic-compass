// Define base classes for all buttons
export const baseClasses =
  "flex items-center justify-center gap-2 rounded-lg text-base font-semibold transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";

// Size classes
export const sizeClasses = {
  sm: "h-8 px-2",
  md: "h-9 px-3",
  lg: "h-12 px-4",
};
// Variant and color classes
export const variantColorClasses = {
  contained: {
    primary: "bg-primary text-white hover:shadow-lg hover:bg-primary-dark",
    secondary:
      "bg-secondary text-white hover:shadow-lg hover:bg-secondary-dark",
    accent: "bg-accent text-white hover:shadow-lg hover:bg-accent-dark",
    success: "bg-success text-white hover:shadow-lg hover:bg-success-dark",
    info: "bg-info text-white hover:shadow-lg hover:bg-info-dark",
    warning: "bg-warning text-white hover:shadow-lg hover:bg-warning-dark",
    error: "bg-error text-white hover:shadow-lg hover:bg-error-dark",
  },
  outlined: {
    primary:
      "border-primary/50 hover:bg-primary/10 border bg-transparent text-primary",
    secondary:
      "border-secondary/50 hover:bg-secondary/10 border bg-transparent text-secondary",
    accent:
      "border-accent/50 hover:bg-accent/10 border bg-transparent text-accent",
    success:
      "border-success/50 hover:bg-success/10 border bg-transparent text-success",
    info: "border-info/50 hover:bg-info/10 border bg-transparent text-info",
    warning:
      "border-warning/50 hover:bg-warning/10 border bg-transparent text-warning",
    error: "border-error/50 hover:bg-error/10 border bg-transparent text-error",
  },
  text: {
    primary: "hover:bg-primary/10 bg-transparent text-primary",
    secondary: "hover:bg-secondary/10 bg-transparent text-secondary",
    accent: "hover:bg-accent/10 bg-transparent text-accent",
    success: "hover:bg-success/10 bg-transparent text-success",
    info: "hover:bg-info/10 bg-transparent text-info",
    warning: "hover:bg-warning/10 bg-transparent text-warning",
    error: "hover:bg-error/10 bg-transparent text-error",
  },
  soft: {
    primary: "bg-primary/10 hover:bg-primary/20 text-primary-dark",
    secondary: "bg-secondary/10 hover:bg-secondary/20 text-secondary-dark",
    accent: "bg-accent/10 hover:bg-accent/20 text-accent-dark",
    success: "bg-success/10 hover:bg-success/20 text-success-dark",
    info: "bg-info/10 hover:bg-info/20 text-info-dark",
    warning: "bg-warning/10 hover:bg-warning/20 text-warning-dark",
    error: "bg-error/10 hover:bg-error/20 text-error-dark",
  },
};

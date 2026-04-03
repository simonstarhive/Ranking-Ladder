type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  fullWidth?: boolean;
};

export default function AdminButton({
  children,
  className = "",
  onClick,
  type = "button",
  fullWidth = true,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${fullWidth ? "w-full" : "w-auto"}
        bg-blue-500 hover:bg-blue-600
        text-white font-semibold
        py-3 rounded-xl 
        sm:px-4 sm:py-2 sm:text-sm
        md:px-5 md:py-2 md:text-base
        px-3 text-sm transition

        ${className}
      `}
    >
      {children}
    </button>
  );
}

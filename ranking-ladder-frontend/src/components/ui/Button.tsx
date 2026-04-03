type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function Button({ children, className = "", onClick, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full
         bg-yellow-400 hover:bg-yellow-500
         text-white font-semibold 
          py-3 rounded-xl transition 
          ${className}`}
    >
      {children}
    </button>
  );
}

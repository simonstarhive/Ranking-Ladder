type InputProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string; 
};

// placeholder
export default function Input({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  error, 
  placeholder 
}: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder} 
        className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600
          ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
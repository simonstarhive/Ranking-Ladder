export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-15">
      {children}
    </div>
  );
}

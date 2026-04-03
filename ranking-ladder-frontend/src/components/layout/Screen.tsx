export default function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-black px-4 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      {children}
      
    </div>
  );
}

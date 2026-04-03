interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black px-4 py-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-5">
        {children}
      </div>
    </div>
  );
}

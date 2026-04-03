import { CheckCircle } from "lucide-react";
import { useRef } from "react";

interface SuccessPopProps {
  onClose: () => void;
}

export default function SuccessPop({ onClose }: SuccessPopProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      ref={ref}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-70 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        className="w-[90%] max-w-sm bg-white rounded-xl shadow-xl p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <CheckCircle
          size={48}
          className="mx-auto text-green-600 mb-4"
        />

        <h2 className="text-xl font-bold mb-2">
          Challenge Sent!
        </h2>

        <p className="text-gray-700 mb-6">
          Thank you! Your challenge has been sent successfully.
        </p>

        <button
          onClick={onClose}
          className="w-full px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-semibold"
        >
          Back to Ranking
        </button>
      </div>
    </div>
  );
}

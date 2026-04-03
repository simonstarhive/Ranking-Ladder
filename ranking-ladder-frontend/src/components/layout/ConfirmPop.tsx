import { X } from "lucide-react";
import { useRef } from "react";

interface ConfirmPopProps {
  playerName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmPop({
  playerName,
  onConfirm,
  onCancel,
}: ConfirmPopProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (ref.current === e.target) {
      onCancel();
    }
  };

  return (
    <div
      ref={ref}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        className="relative w-[90%] max-w-sm bg-white rounded-xl shadow-xl p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close X */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-bold mb-4">
          Confirm Challenge
        </h2>

        <p className="text-gray-700 mb-6">
          Are you sure you want to challenge{" "}
          <span className="font-semibold">{playerName}</span>?
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            No
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-semibold"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

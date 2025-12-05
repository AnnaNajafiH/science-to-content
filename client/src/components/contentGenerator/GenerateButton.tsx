import { Loader2, Sparkles } from "lucide-react";

type GenerateButtonProps = {
  generating: boolean;
  disabled: boolean;
  onGenerate: () => void;
};

export default function GenerateButton({
  generating,
  disabled,
  onGenerate,
}: GenerateButtonProps) {
  return (
    <button
      onClick={onGenerate}
      disabled={disabled}
      className="w-full py-4 bg-gradient-to-r from-purple-600 via-beiersdorf-blue to-blue-600 text-white rounded-lg hover:from-purple-700 hover:via-beiersdorf-navy hover:to-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
    >
      {generating ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Generating Content...
        </>
      ) : (
        <>
          <Sparkles className="w-5 h-5" />
          Generate Content
        </>
      )}
    </button>
  );
}

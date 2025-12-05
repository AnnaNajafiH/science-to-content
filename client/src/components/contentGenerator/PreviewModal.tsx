import InstagramPost from "./InstagramPost";
import InstagramImage from "../../assets/images/InstagramImage.png";
import type{ GeneratedContent } from "../../types";

type Props = {
  generatedContent: GeneratedContent;
  onClose: () => void;
};

export default function PreviewModal({ generatedContent, onClose }: Props) {
  // Presentational preview modal. onClose is called when clicking backdrop or the close button.
  if (!generatedContent) return null;

  // If slides are missing (e.g. reel caption or video script), synthesize a single
  // preview slide from caption or script so the preview still shows something.
  const slides =
    generatedContent.slides && generatedContent.slides.length > 0
      ? generatedContent.slides
      : [
          {
            number: 1,
            text: generatedContent.caption || generatedContent.script || "",
            visualHint:
              (generatedContent.visualSuggestions && generatedContent.visualSuggestions[0]) ||
              "",
          },
        ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-5 right-10 text-white text-2xl hover:text-gray-300"
          aria-label="Close preview"
        >
          ✕ Close Preview
        </button>

        <InstagramPost
          username="@B.SkinWise"
          slides={slides.map((slide) => ({
            text: slide.text,
            visualHint: slide.visualHint,
          }))}
          caption={generatedContent.caption || ""}
          hashtags={generatedContent.hashtags || []}
          likes={0}
          timeAgo="Just now"
          product={{
            name: "Bioderma Sensibio H2O",
            url: "#",
            image: "/assets/brand/bioderma-sensibio.jpg",
            sku: "SENS-H2O",
          }}
          backgroundImage={InstagramImage}
        />
      </div>
    </div>
  );
}

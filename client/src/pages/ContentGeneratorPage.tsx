import { Sparkles, Instagram, Play, FileVideo } from "lucide-react";
import { useContentGenerator } from "../Contexts/contentGenerator/useContent.ts";
import TrendSelector from "../components/contentGenerator/TrendSelector.tsx";
import ContentTypeSelector from "../components/contentGenerator/ContentTypeSelector.tsx";
import GenerateButton from "../components/contentGenerator/GenerateButton.tsx";
import OutputPanel from "../components/contentGenerator/OutputPanel.tsx";
import PreviewModal from "../components/contentGenerator/PreviewModal.tsx";
import ConfettiCanvas from "../components/common/ConfettiCanvas.tsx";

function ContentGenerator() {
  const {
    state,
    selectTrend,
    setContentType,
    generate,
    openPreview,
    closePreview,
    notifySendSuccess,
  } = useContentGenerator();
  const {
    trends,
    selectedTrendId,
    contentType,
    generating,
    generatedContent,
    showPreview,
    showConfetti,
  } = state;

  const contentTypes = [
    { id: "instagram-carousel", name: "Instagram Carousel", icon: Instagram },
    { id: "reel", name: "Reel Caption", icon: Play },
    { id: "video-script", name: "Video Script", icon: FileVideo },
  ];

  const selectedTrend = trends.find((t) => t.id === selectedTrendId);

  return (
    <div className="space-y-6">
      {showConfetti && <ConfettiCanvas/>}

      <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
          <Sparkles className="w-7 h-7 text-purple-600" />
          Content Generator
        </h2>
        <p className="text-gray-600">
          Transform trending topics into engaging, science-backed content.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 space-y-6">
          <TrendSelector
            trends={trends}
            selectedTrend={selectedTrendId ?? ""}
            setSelectedTrend={selectTrend}
            selectedTrendData={selectedTrend}
          />
          <div>
            <ContentTypeSelector
              contentType={contentType}
              setContentType={setContentType}
              contentTypes={contentTypes}
            />
          </div>
          <GenerateButton
            onGenerate={generate}
            generating={generating}
            disabled={generating || !selectedTrendId}
          />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <OutputPanel
            generatedContent={generatedContent ?? null}
            generating={generating}
            onPreview={openPreview}
            onSendSuccess={notifySendSuccess}
          />
        </div>
      </div>
      {/* Instagram Preview Modal (presentational) */}
      {showPreview && generatedContent && (
        <PreviewModal
          generatedContent={generatedContent}
          onClose={closePreview}
        />
      )}
    </div>
  );
}

export default ContentGenerator;

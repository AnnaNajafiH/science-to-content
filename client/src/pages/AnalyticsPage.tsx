import { useState } from "react";
import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import HistoryButton from "../components/analytics/HistoryButton";
import KeyMetrics from "../components/analytics/KeyMetrics";
import SecondaryMetrics from "../components/analytics/SecondaryMetrics";
import TrendingTopics from "../components/analytics/TrendingTopics";
import ContentPerformance from "../components/analytics/ContentPerformance";
import SystemHealth from "../components/analytics/SystemHealth";
import HistoryModal from "../components/analytics/HistoryModal";

const AnalyticsPage: React.FC = () => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="space-y-6">
      <AnalyticsHeader />

      <KeyMetrics />

      <SecondaryMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendingTopics />
        <ContentPerformance />
      </div>

      <HistoryButton setShowHistory={setShowHistory} />

      {showHistory && (
        <HistoryModal
          setShowHistory={setShowHistory}
        />
      )}

      <SystemHealth />
    </div>
  );
};
export default AnalyticsPage;

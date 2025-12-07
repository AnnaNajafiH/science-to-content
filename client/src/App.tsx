import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import { TrendsProvider } from "./Contexts/trendDashboardContext/trendProvider";
import TrendDashboard from "./pages/TrendDashboardPage";
import ContentCreator from "./pages/ContentGeneratorPage";
import ReviewQueue from "./pages/ReviewQueuePage";
import InternalBriefGenerator from "./pages/InternalBriefGeneratorPage";
import Analytics from "./pages/AnalyticsPage";
import { ContentGeneratorProvider } from "./Contexts/contentGenerator/contentProvider";
import { ReviewProvider } from "./Contexts/reviewQueueContext/reviewProvider";
import { InternalBriefProvider } from "./Contexts/internalBriefContext/internalBriefProvider";

function App() {
  return (
    <InternalBriefProvider>
      <TrendsProvider>
        <ContentGeneratorProvider>
          <ReviewProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<TrendDashboard />} />
                <Route path="generate" element={<ContentCreator />} />
                <Route path="review" element={<ReviewQueue />} />
                <Route path="internal" element={<InternalBriefGenerator />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="*" element={<TrendDashboard />} />
              </Route>
            </Routes>
          </ReviewProvider>
        </ContentGeneratorProvider>
      </TrendsProvider>
    </InternalBriefProvider>
  );
}

export default App;

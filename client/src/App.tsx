import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import { TrendsProvider } from "./Contexts/trendDashboardContext/trendProvider";
import TrendDashboard from "./pages/TrendDashboard";
import ContentCreator from "./pages/ContentGenerator";
import ReviewQueue from "./pages/ReviewQueue";
import InternalBriefGenerator from "./pages/InternalBriefGenerator";
import Analytics from "./pages/Analytics";
import { ContentGeneratorProvider } from "./Contexts/contentGenerator/contentProvider";

function App() {
  return (
    <ContentGeneratorProvider>
      <TrendsProvider>
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
      </TrendsProvider>
    </ContentGeneratorProvider>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import TrendDashboard from "./pages/TrendDashboard";
import ContentCreator from "./pages/ContentCreator";
import ReviewQueue from "./pages/ReviewQueue";
import InternalBriefGenerator from "./pages/InternalBriefGenerator";
import Analytics from "./pages/Analytics";

function App() {
  return (
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
  );
}

export default App;

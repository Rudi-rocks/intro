import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GradeSimulator from "./pages/GradeSimulator";
import ScreenshotAnalysis from "./pages/ScreenshotAnalysis";
import StudyPlanner from "./pages/StudyPlanner";
import Dashboard from "./pages/Dashboard";
import CodingArena from "./pages/CodingArena";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulator" element={<GradeSimulator />} />
          <Route path="/screenshot" element={<ScreenshotAnalysis />} />
          <Route path="/planner" element={<StudyPlanner />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/arena" element={<CodingArena />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import PlayWithtAI from "$views/PlayWithAI";
import PlayLocal from "$views/PlayLocal";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<PlayLocal key="play-local" />} />
    <Route path="/play-ai" element={<PlayWithtAI key="play-ai" />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;

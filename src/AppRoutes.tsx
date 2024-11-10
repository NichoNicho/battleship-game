import { Navigate, Route, Routes } from "react-router-dom";
import PlayWithtAI from "$views/PlayWithAI";
import PlayLocal from "$views/PlayLocal";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<PlayLocal />} />
    <Route path="/play-ai" element={<PlayWithtAI />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;

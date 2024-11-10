import { Navigate, Route, Routes } from "react-router-dom";
import PlayWithtAI from "$views/PlayWithAI";
import PlayWithFriend from "$views/PlayWithFriend";
import Scoreboard from "$views/Scoreboard";
import PlayLocal from "$views/PlayLocal";

const AppRoutes = () => (
  <Routes>
    <Route path="/play-local" element={<PlayLocal />} />
    <Route path="/" element={<Scoreboard />} />
    <Route path="/play-ai" element={<PlayWithtAI />} />
    <Route path="/play-friend" element={<PlayWithFriend />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;

//UI Components - https://daisyui.com/components/

import { BrowserRouter, Routes, Route } from "react-router-dom";

//my pages
import { Home } from "@/pages/Home";
import { Log } from "@/pages/Log";
import { Results } from "@/pages/Results";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log" element={<Log />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

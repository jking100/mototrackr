//UI Components - https://daisyui.com/components/
//import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//my pages
import { Home } from "@/pages/Home";
import { Test } from "@/pages/Test";
import { Log } from "@/pages/Log";
import { Results } from "@/pages/Results";

import { GPSProvider } from "@/components/features/geolocation";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/test"
            element={
              <GPSProvider>
                <Test />
              </GPSProvider>
            }
          />
          <Route path="/log" element={<Log />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

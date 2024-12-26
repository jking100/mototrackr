//UI Components - https://daisyui.com/components/
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

//my components
import { NavBar } from "@/components/ui/NavBar";
import { Home } from "@/pages/Home";
import { Test } from "@/pages/Test";
import { Log } from "@/pages/Log";
import { Results } from "@/pages/Results";
//import { DeviceMotionProvider } from "@/components/features/deviceMotion/";

function App() {
  return (
      <div className="container mx-auto">
        <div className="overflow-x-hidden min-h-screen w-full max-w-full">
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/test" element={ <Test /> } />
              <Route path="/log" element={ <Log /> }/>
              <Route path="/results" element={ <Results /> }/>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
  );
}

export default App;
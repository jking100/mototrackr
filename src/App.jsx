//UI Components - https://daisyui.com/components/
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

//my components
import { Home } from "@/pages/Home";
import { Test } from "@/pages/Test";
import { Log } from "@/pages/Log";
import { Results } from "@/pages/Results";

function App() {
  return (
      <div className="w-full min-h-screen">
        <div className="h-full w-full">
          <BrowserRouter>
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

//UI Components - https://daisyui.com/components/
import "./App.css";
//import React from "react";
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

function App() {

  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={ <Test /> } />
        <Route path="/log" element={ <Log /> }/>
        <Route path="/results" element={ <Results /> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
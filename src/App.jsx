//UI Components - https://daisyui.com/components/
import "./App.css"
//import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

//my components
import { NavBar } from "@/components/ui/NavBar"
import { Home } from "@/pages/Home"
import { About } from "@/pages/About"
import { Log } from "@/pages/Log"
import { Admin } from "@/pages/Admin"

function App() {

  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={ <About /> } />
        <Route path="/log" element={ <Log /> }/>
        <Route path="/admin" element={ <Admin /> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App